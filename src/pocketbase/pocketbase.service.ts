import { Injectable } from '@nestjs/common';
import { assert } from 'console';
import PocketBase from 'pocketbase';

@Injectable()
export class PocketBaseService {
  private readonly pb: PocketBase;
  private readonly instanceId: number;

  constructor() {
    assert(process.env.API_URL, 'API_URL is not defined in .env file');
    assert(process.env.PB_ADMIN_EMAIL, 'PB_ADMIN_EMAIL is not defined in .env file');
    assert(process.env.PB_ADMIN_PASSWORD, 'PB_ADMIN_PASSWORD is not defined in .env file');
    this.pb = new PocketBase(process.env.API_URL);
    this.pb.admins.authWithPassword(
        process.env.PB_ADMIN_EMAIL as string,
        process.env.PB_ADMIN_PASSWORD as string
    );
    console.log(`PocketBase instance created with URL: ${process.env.API_URL}`);
    this.instanceId = Math.floor(Math.random() * 10000);
    console.log(`PocketBase instance ID: ${this.instanceId}`);
  }

    getInstanceId(): number {
        return this.instanceId;
    }

   getInstance(): PocketBase {
        return this.pb;
    }
}