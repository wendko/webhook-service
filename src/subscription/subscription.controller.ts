import { Controller, Get, Delete, Post, Patch, Body, Param } from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";

@Controller('subscription')
export class SubscriptionController {
    constructor(private subscriptionService: SubscriptionService) { }

    @Post()
    async createNewSubscription(
        @Body('subscriberEndpoint') subscriberEndpoint: string,
        @Body('notificationType') notificationType: string,
    ) {
        const id = await this.subscriptionService.insertSubscription(subscriberEndpoint, notificationType);
        return id;
    }

    @Get(':notificationType')
    async getSubscriptionsByNotificationType(@Param('notificationType') notificationType) {
        const subscriptions = await this.subscriptionService.getSubscriptionsByNotificationType(notificationType);
        return subscriptions;
    }

}