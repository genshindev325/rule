import { Document, ObjectId, Schema, model } from 'mongoose';

interface IEvent extends Document {
    eventName: string;
    category: string;
    coverImage: string;
    explanatoryText: string;
    scheduleDate: Date;
    scheduleStartingTime: TimeRanges;
    numberOfMalesRecruited: number;
    numberOfFemalesRecruited: number;
    maleFee: number;
    femaleFee: number;
    userId: ObjectId;
    // storeId: ObjectId;
}

const eventSchema = new Schema<IEvent>({
    eventName: { type: String, required: true },
    category: { type: String, required: true },
    coverImage: { type: String, required: true },
    explanatoryText: { type: String, required: true },
    scheduleDate: { type: Date, required: true },
    scheduleStartingTime: { type: TimeRanges, required: true },
    numberOfMalesRecruited: { type: Number, required: true },
    numberOfFemalesRecruited: { type: Number, required: true },
    maleFee: { type: Number, required: true },
    femaleFee: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, require:true },
    // storeId: { type: Schema.Types.ObjectId, require:true },
});


const Event = model<IEvent>('Event', eventSchema);
export default Event;
