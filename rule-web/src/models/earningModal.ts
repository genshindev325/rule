import mongoose, { Document, Schema, Model } from 'mongoose';

interface IEarning extends Document {
    storeId: mongoose.ObjectId;
    eventId: mongoose.ObjectId;
    eventDate: Date;
    maxEarning: number;
    totalEarning: number;
    status: string;
    createdAt: Date;
}

const earningSchema = new Schema<IEarning>({
    storeId: { type: Schema.Types.ObjectId, required: true, ref: 'Store' },
    eventId: { type: Schema.Types.ObjectId, require:true, ref: 'Event' },
    eventDate: { type: Date },
    maxEarning: { type: Number, default: 0 },
    totalEarning: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["active", "canceled", "finished"],
        default: "active"
    },
    createdAt: { type: Date, default: () => new Date() },
});

const Earning: Model<IEarning> = mongoose.models.Earning || mongoose.model<IEarning>('Earning', earningSchema);
export default Earning;
