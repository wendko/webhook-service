import { Injectable, BadRequestException, HttpServer, HttpService } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotificationType, NotificationLog } from "./notification.model";
import { SubscriptionService } from "src/subscription/subscription.service";

@Injectable()
export class NotificationService {

    constructor(
        @InjectModel('Notification') private readonly notificationTypeModel: Model<NotificationType>,
        @InjectModel('Notification') private readonly notificationLogModel: Model<NotificationLog>,
        private subscriptionService: SubscriptionService,
        private httpService: HttpService
    ) { }

    async insertNotificationType(notificationType: string, testData: any) {
        try {
            const newNotification = new this.notificationTypeModel({
                notificationType,
                testData
            });
            const result = await newNotification.save();
            return result.id as string;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async updateNotificationType(notificationType: string, testData: any) {
        try {
            const updatedNotification = await this.findNotificationType(notificationType);
            updatedNotification.testData = testData;
            await updatedNotification.save();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async sendNotifications(notificationType: string, data: any) {
        const results = await this.subscriptionService.getSubscriptionsByNotificationType(notificationType);
        for (const result of results) {
            this.httpService.post(result.endpoint, data).subscribe(async r => {
                // check status code OK

                await this.createNotificationLog();
                console.log('result : ', r)
            });
        }
    }

    async createNotificationLog() {

    }

    private async findNotificationType(notificationType: string) {
        const notification = await this.notificationTypeModel.findOne({ notificationType });
        return notification;
    }

}