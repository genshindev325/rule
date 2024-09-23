import mongoose, { Document, Schema, Model } from 'mongoose';

interface IPayment extends Document {
    storeId: mongoose.ObjectId;
    storeName: string;
    paymentDate: Date;
    paymentAmount: number;
    status: string;
    createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
    storeId: { type: Schema.Types.ObjectId, required: true, ref: 'Store' },
    storeName: { type: String, required: true },
    paymentDate: { type: Date },
    paymentAmount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "paid"
    },
    createdAt: { type: Date, default: () => new Date() },
});

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>('Payment', paymentSchema);
export default Payment;
