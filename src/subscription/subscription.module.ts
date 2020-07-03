import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionService } from "./subscription.service";
import { SubscriptionSchema } from "./subscription.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Subscription', schema: SubscriptionSchema }])
    ],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
    exports: [SubscriptionService]
})
export class SubscriptionModule { }
