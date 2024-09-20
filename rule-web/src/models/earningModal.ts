import mongoose, { Document, Schema, Model } from 'mongoose';

interface IEarning extends Document {
    storeId: mongoose.ObjectId;
    earnings: number;
    earningsExp: number;
    totalPaid: number;
    status: string;
    createdAt: Date;
}

const earningSchema = new Schema<IEarning>({
    storeId: { type: Schema.Types.ObjectId, required: true, ref: 'Store' },
    earnings: { type: Number, default: 0 },
    earningsExp: { type: Number, default: 0 },
    totalPaid: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["active", "canceled", "finished"],
        default: "active"
    },
    createdAt: { type: Date, default: () => new Date() },
});

const Earning: Model<IEarning> = mongoose.models.Earning || mongoose.model<IEarning>('Earning', earningSchema);
export default Earning;
