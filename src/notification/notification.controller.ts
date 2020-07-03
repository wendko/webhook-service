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


    @Post()
    async resendNotifications(

    ) {

    }



    // put in another service?
    @EventPattern('invoice_paid')
    async handleInvoicePaid(data) {
        console.log('xendit service got invoice paid!');
        await this.notificationService.sendNotifications('invoice_paid', data);
    }

}