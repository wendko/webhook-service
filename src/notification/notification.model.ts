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
    notificationType: { type: String, required: true },
    testData: { type: Object }
})

export interface NotificationLog extends mongoose.Document {
    id: string,
    subscriberEndpoint: string,
    data: string,

}
