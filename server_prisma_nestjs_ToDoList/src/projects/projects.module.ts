import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService,
    {
      provide: 'RABBITMQ_TASKFIELDVALUE_SERVICE',
        useFactory:(configService: ConfigService) => {
          const USER = configService.get('RABBITMQ_DEFAULT_USER');
          const PASSWORD =  configService.get('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get('RABBITMQ_HOST');
          const QUEUE = configService.get('RABBITMQ_TASKFIELDVALUE_QUEUE');
    
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls:[`amqp://${USER}:${PASSWORD}@${HOST}`],
              queue: QUEUE,
              queueOptions: {
                durable: false,
                noAck: true
              }
            }
          })
        },
        inject:[ConfigService]
    }
  ],
  imports : [DatabaseModule, JwtModule, AuthModule],
  exports: [ProjectsModule]
})
export class ProjectsModule {}
