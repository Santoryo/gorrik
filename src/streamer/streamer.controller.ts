import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Param } from '@nestjs/common'
import { PocketBaseService } from '../pocketbase/pocketbase.service.js'
import { Gw2dataService } from '../gw2data/gw2data.service.js';
import { DB_COLLECTIONS } from '../constants/database.js';
import { StreamerData } from 'src/constants/interfaces.js';

@Controller('streamer')
export class StreamerController {
    gw2Api = new Gw2dataService();
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly pbService: PocketBaseService) {}

    @Get(':twitchId')
    async getStreamerCharacters(@Param('twitchId') twitchId: string) {
        const cachedData = await this.cacheManager.get(`streamer_${twitchId}`);
        if (cachedData) {
            console.log(`Returning cached character for streamer with ID: ${twitchId}`);
            return cachedData;
        }

        const data = await this.pbService.getInstance().collection<StreamerData>(DB_COLLECTIONS.USERS).getList(1, 1, {
            filter: `twitchId = "${twitchId}"`,
        });

        if(data.items.length === 0) {
            return {message: `No streamer found with ID: ${twitchId}`};
        }

        const streamerData: StreamerData = data.items[0];
        console.log(streamerData.updated);
        const updatedTimestamp = new Date(streamerData.updated).getTime(); // Convert `updated` to a timestamp
        const currentTimestamp = Date.now(); // Get the current timestamp
        const fiveMinutesInMs = 5 * 60 * 1000; // 5 minutes in milliseconds
        const timeSinceUpdate = currentTimestamp - updatedTimestamp;
        const remainingTime = fiveMinutesInMs - timeSinceUpdate;

        if (remainingTime >= fiveMinutesInMs) {
            console.log(`Returning cached in db character for streamer with ID: ${twitchId}`);
            await this.cacheManager.set(`streamer_${twitchId}`, streamerData.character, remainingTime);
            return streamerData.character;
        }

        const characters = await this.gw2Api.getCharacters(streamerData.apiKey);

        if(characters.length === 0) {
            return {message: `No characters found for streamer with ID: ${twitchId}`};
        }

        const cleanedCharacter = {
            name: characters[0].name,
            race: characters[0].race,
            profession: characters[0].profession, 
            level: characters[0].level,
            age: characters[0].age,
            last_modified: characters[0].last_modified,
            created: characters[0].created, 
            deaths: characters[0].deaths,
            active_build_tab: characters[0].active_build_tab, 
            build_tabs: characters[0].build_tabs,
            active_equipment_tab: characters[0].active_equipment_tab,
            equipment_tabs: characters[0].equipment_tabs,
        };


        const a = await this.pbService.getInstance().collection<StreamerData>(DB_COLLECTIONS.USERS).update(streamerData.id, {
            character: cleanedCharacter
        });
    
        console.log(`Updated character for streamer with ID: ${twitchId}`);
        await this.cacheManager.set(`streamer_${twitchId}`, cleanedCharacter, 300000);

        return cleanedCharacter;
    }

}
