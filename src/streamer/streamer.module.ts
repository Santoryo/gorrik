import { Module } from '@nestjs/common';
import { StreamerController } from './streamer.controller.js';
import { CacheModule } from '@nestjs/cache-manager';
import { PocketBaseService } from '../pocketbase/pocketbase.service.js';

@Module({
  imports: [CacheModule.register()],
  controllers: [StreamerController],
  providers: [PocketBaseService],
})
export class StreamerModule {
}
