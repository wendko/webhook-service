import * as mongoose from 'mongoose';

export const SubscriptionSchema = new mongoose.Schema<Subscription>({
    subscriberEndpoint: { type: String, required: true },
    notificationType: { type: String, required: true }
})

export interface Subscription extends mongoose.Document {
    id: string;
    subscriberEndpoint: string;
    notificationType: string;
}