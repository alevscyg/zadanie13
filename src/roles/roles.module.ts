import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports : [DatabaseModule],
})
export class RolesModule {};
