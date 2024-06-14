import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports : [DatabaseModule, JwtModule, AuthModule],
  exports: [ProjectsModule]
})
export class ProjectsModule {}
