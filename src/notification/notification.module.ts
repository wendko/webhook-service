import { Module, HttpModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NotificationTypeSchema, NotificationLogSchema } from "./notification.model";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { SubscriptionModule } from "src/subscription/subscription.module";

@Module({
    imports: [
        HttpModule,
        SubscriptionModule,
        MongooseModule.forFeature([
            { name: 'NotificationType', schema: NotificationTypeSchema },
            { name: 'NotificationLog', schema: NotificationLogSchema }
        ]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule { }