import mongoose, { Document, Schema, Model } from 'mongoose';
const timeNow = new Date();

interface IStorePayment extends Document {
    store: mongoose.ObjectId;
    storeName: string;
    paymentDate: string;
    paymentAmount: number;
    status: string;
    createdAt: Date;
}

const storePaymentSchema = new Schema<IStorePayment>({
    store: { type: Schema.Types.ObjectId, required: true, ref: 'Store' },
    paymentDate: { type: String, default: '2024年 10月 05日' },
    storeName: { type: String, required: true, default: '未知' },
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
