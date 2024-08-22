import mongoose, { Document, Schema, Model } from 'mongoose';

interface IEvent extends Document {
    eventName: string;
    category: string;
    coverImage: string;
    description: string;
    eventDate: Date;
    eventStartTime: Date;
    eventEndTime: Date;
    numberOfMalesRecruited: number;
    numberOfFemalesRecruited: number;
    maleRate: number;
    femaleRate: number;
    storeId: mongoose.ObjectId;

    createdAt: Date;
}

const eventSchema = new Schema<IEvent>({
    eventName: { type: String, required: true },
    category: { type: String, required: true },
    coverImage: { type: String },
    description: { type: String },
    eventDate: { type: Date },
    eventStartTime: { type: Date, },
    eventEndTime: { type: Date, },
    numberOfMalesRecruited: { type: Number, required: true },
    numberOfFemalesRecruited: { type: Number, required: true },
    maleRate: { type: Number, required: true },
    femaleRate: { type: Number, required: true },
    storeId: { type: Schema.Types.ObjectId, require:true },

    createdAt: { type: Date, default: () => new Date() },
});

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
export default Event;
