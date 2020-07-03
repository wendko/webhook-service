import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './notification/notification.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        NotificationModule,
        SubscriptionModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_HOST)
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
