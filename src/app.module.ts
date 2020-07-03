import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './notification/notification.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
    imports: [
        NotificationModule,
        SubscriptionModule,
        MongooseModule.forRoot('mongodb://localhost/webhooks_system')
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
