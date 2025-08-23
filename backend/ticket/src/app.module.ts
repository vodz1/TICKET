import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { AuthModule } from './auth/auth.module';
import { TicketGatewayModule } from './ticket-gateway/ticket-gateway.module';
import { BullModule } from '@nestjs/bullmq';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),

    // Mongoose: read URI from ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        // other mongoose options here
      }),
      inject: [ConfigService],
    }),

    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // BullModule.registerQueue({name : 'test'}),
    

    AuthModule,
    UsersModule,
    TicketsModule,
    TicketGatewayModule,
    ProductsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
