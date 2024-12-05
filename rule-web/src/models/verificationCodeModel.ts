import mongoose, { Document, Schema, Model } from 'mongoose';

interface IVerificationCode extends Document {
  email: string;
  code: string;
  expiresAt: Date;
}

const verificationCodeSchema = new Schema<IVerificationCode>({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const VerificationCode: Model<IVerificationCode> = mongoose.models.VerificationCode || mongoose.model<IVerificationCode>('VerificationCode', verificationCodeSchema);
export default VerificationCode;