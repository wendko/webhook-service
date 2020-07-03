import { Module, HttpModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NotificationTypeSchema } from "./notification.model";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { SubscriptionModule } from "src/subscription/subscription.module";

@Module({
    imports: [
        HttpModule,
        SubscriptionModule,
        MongooseModule.forFeature([{ name: 'Notification', schema: NotificationTypeSchema }]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule { }