import { Test, TestingModule } from '@nestjs/testing';
import { Gw2dataService } from './gw2data.service';

describe('Gw2dataService', () => {
  let service: Gw2dataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Gw2dataService],
    }).compile();

    service = module.get<Gw2dataService>(Gw2dataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
