import { Controller, Get, Delete, Post, Patch, Body, Param } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { EventPattern } from "@nestjs/microservices";

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    @Post('notification-type')
    async createNewNotificationType(
        @Body('notificationType') notificationType: string,
        @Body('testData') testData: any,
    ) {
        const id = await this.notificationService.insertNotificationType(notificationType, testData);
        return id;
    }

    @Patch('notification-type/:notificationType')
    async updateNotificationType(
        @Param('notificationType') notificationType: string,
        @Body('testData') testData: any
    ) {
        await this.notificationService.updateNotificationType(notificationType, testData);
        return null;
    }

    @Post('test-notification')
    async sendTestNotification(
        @Body('subscriberEndpoint') subscriberEndpoint: string,
        @Body('notificationType') notificationType: string
    ) {
        await this.notificationService.sendTestNotification(subscriberEndpoint, notificationType);
    }

    @Post('resend-notification')
    async resendNotifications(
        @Body('subscriberEndpoint') subscriberEndpoint: string,
        @Body('notificationType') notificationType: string,
        @Body('count') count: number,
    ) {
        await this.notificationService.resendNotifications(subscriberEndpoint, notificationType, count);
        return null;
    }


    @EventPattern('invoice_paid')
    async handleInvoicePaid(data) {
        await this.notificationService.sendNotifications('invoice_paid', data);
    }

    @EventPattern('fva_created')
    async handleFixedVirtualAccountCreated(data) {
        await this.notificationService.sendNotifications('fva_created', data);
    }

}