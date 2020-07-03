import * as mongoose from 'mongoose';

export const SubscriptionSchema = new mongoose.Schema<Subscription>({
    endpoint: { type: String, required: true },
    notificationType: { type: String, required: true }
})

export interface Subscription extends mongoose.Document {
    id: string;
    endpoint: string;
    notificationType: string;
}