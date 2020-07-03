import * as mongoose from 'mongoose';

export const NotificationTypeSchema = new mongoose.Schema({
    notificationType: { type: String, required: true },
    testData: { type: Object }
})

export interface NotificationType extends mongoose.Document {
    id: string,
    notificationType: string,
    testData: any
}

export const NotificationLogSchema = new mongoose.Schema({
    subscriberEndpoint: { type: String, required: true },
    notificationType: { type: String, required: true },
    data: { type: Object, required: true }
})

export interface NotificationLog extends mongoose.Document {
    id: string,
    subscriberEndpoint: string,
    notificationType: string,
    data: any
}
