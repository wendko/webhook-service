import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Subscription } from "./subscription.model";

@Injectable()
export class SubscriptionService {

    constructor(@InjectModel('Subscription') private readonly subscriptionModel: Model<Subscription>) { }

    async insertSubscription(endpoint: string, notificationType: string) {
        try {
            const newSubscription = new this.subscriptionModel({
                endpoint,
                notificationType
            });
            const result = await newSubscription.save();
            return result.id as string;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async getSubscriptionsByNotificationType(notificationType: string) {
        try {
            const results = await this.subscriptionModel.find({ notificationType });
            return results;
        } catch (e) {
            throw new NotFoundException(e);
        }
    }
}