import { Injectable } from '@nestjs/common';
import { ApiLanguage, GW2Api } from 'guildwars2-ts';

@Injectable()
export class Gw2dataService {
  async getCharacters(apiKey: string): Promise<any> {
    const gw2Api = await fetch(
      `https://api.guildwars2.com/v2/characters?ids=all&access_token=${apiKey}&v=2019-12-19T00:00:00.000Z`,
    );
    if (!gw2Api.ok) {
      return [];
    }
    const characters = await gw2Api.json();
    return characters;
  }
}
