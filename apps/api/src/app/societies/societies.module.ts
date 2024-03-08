import { Module } from '@nestjs/common';
import { SocietiesController } from './societies.controller';
import { SocietiesService } from './societies.service';

@Module({
  controllers: [SocietiesController],
  providers: [SocietiesService],
})
export class SocietiesModule {}
