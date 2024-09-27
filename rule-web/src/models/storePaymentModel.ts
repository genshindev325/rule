import mongoose, { Document, Schema, Model } from 'mongoose';
import { getPaymentDate } from '@/utils/getPaymentDate';
const timeNow = new Date();

interface IStorePayment extends Document {
    store: mongoose.ObjectId;
    // storeName: string;
    paymentDate: Date;
    paymentAmount: number;
    status: string;
    createdAt: Date;
}

const storePaymentSchema = new Schema<IStorePayment>({
    store: { type: Schema.Types.ObjectId, required: true, ref: 'Store' },
    paymentDate: { type: Date, default: () => new Date() },
    // storeName: { type: String, required: true },
    paymentAmount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid"
    },
    createdAt: { type: Date, default: () => timeNow },
});

const StorePayment: Model<IStorePayment> = mongoose.models.StorePayment || mongoose.model<IStorePayment>('StorePayment', storePaymentSchema);

export default StorePayment;
