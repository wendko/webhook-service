import { Injectable, BadRequestException, HttpServer, HttpService } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotificationType, NotificationLog } from "./notification.model";
import { SubscriptionService } from "src/subscription/subscription.service";

@Injectable()
export class NotificationService {

    constructor(
        @InjectModel('NotificationType') private readonly notificationTypeModel: Model<NotificationType>,
        @InjectModel('NotificationLog') private readonly notificationLogModel: Model<NotificationLog>,
        private subscriptionService: SubscriptionService,
        private httpService: HttpService
    ) { }

    async insertNotificationType(notificationType: string, testData: any) {
        const existingNotificationType = await this.findNotificationType(notificationType);
        if (existingNotificationType) {
            throw new BadRequestException('Notification type already exists');
        }

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
            try {
                this.httpService.post(result.subscriberEndpoint, data).subscribe(async r => {
                    // check status code OK

                    await this.createNotificationLog(result.subscriberEndpoint, notificationType, data);
                });
            } catch (e) {
                throw new BadRequestException(e);
            }
        }
    }

    async sendTestNotification(subscriberEndpoint: string, notificationType: string) {
        const type = await this.notificationTypeModel.findOne({ notificationType });
        this.httpService.post(subscriberEndpoint, type.testData).subscribe();
    }

    async createNotificationLog(subscriberEndpoint: string, notificationType: string, data: any) {
        try {
            const notificationLog = new this.notificationLogModel({
                subscriberEndpoint, notificationType, data, retries: 0
            });
            await notificationLog.save();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async resendNotifications(subscriberEndpoint: string, notificationType: string, count: number) {
        const logs = await this.getNotificationLogs(subscriberEndpoint, notificationType, count);
        for (const log of logs) {
            this.httpService.post(subscriberEndpoint, log.data).subscribe(async r => {
                const updateLog = await this.notificationLogModel.findById(log.id);
                updateLog.retries = updateLog.retries + 1;
                updateLog.save();
            });

        }
    }

    private async getNotificationLogs(subscriberEndpoint: string, notificationType: string, count: number = 1) {
        try {
            const results = await this.notificationLogModel.find({ subscriberEndpoint, notificationType }).limit(count);
            return results;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    private async findNotificationType(notificationType: string) {
        const notification = await this.notificationTypeModel.findOne({ notificationType });
        return notification;
    }

}