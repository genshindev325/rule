import mongoose, { Document, Schema, Model } from 'mongoose';

interface IEventParticipate extends Document {
    userId: mongoose.ObjectId;
    eventId: mongoose.ObjectId;
    fee: number;
    totalPrice: number;
    status: string;
    createdAt: Date;
}

const eventParticipateSchema = new Schema<IEventParticipate>({
    userId: { type: Schema.Types.ObjectId, require:true, ref: 'User' },
    eventId: { type: Schema.Types.ObjectId, require:true, ref: 'Event' },
    fee: { type:Number, default: 0 },
    totalPrice: { type:Number, default: 0 },
    status: { type: String },
    createdAt: { type: Date, default: () => new Date() },
});

const EventParticipate: Model<IEventParticipate> = mongoose.models.EventParticipate || mongoose.model<IEventParticipate>('EventParticipate', eventParticipateSchema);
export default EventParticipate;
