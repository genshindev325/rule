import mongoose, { Document, Schema, Model } from 'mongoose';

enum EventParticipateStatus {
    Active = "active",
    Inactive = "inactive", // or Canceled = "canceled",
    Past = "past",
}

interface IEventParticipate extends Document {
    userId: mongoose.ObjectId;
    eventId: mongoose.ObjectId;
    status: string;

    createdAt: Date;
}

const eventParticipateSchema = new Schema<IEventParticipate>({
    userId: { type: Schema.Types.ObjectId, require:true, ref: 'User' },
    eventId: { type: Schema.Types.ObjectId, require:true, ref: 'Event' },
    status: { type: String },

    createdAt: { type: Date, default: () => new Date() },
});

const EventParticipate: Model<IEventParticipate> = mongoose.models.EventParticipate || mongoose.model<IEventParticipate>('EventParticipate', eventParticipateSchema);
export default EventParticipate;
