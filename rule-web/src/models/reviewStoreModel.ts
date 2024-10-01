import mongoose, { Document, Schema, Model, ObjectId, mongo } from 'mongoose';

interface IReview extends Document {
  storeId: ObjectId;
  storeReviewText: string;
  storeRating: number;
  storeReplyText: string;
  createdBy: ObjectId;
  createdAt: Date;
}

const reviewStoreSchema = new Schema<IReview>({
  storeId: { type: mongoose.Types.ObjectId, required: true, ref: 'Store' },
  storeRating: { type: Number, required: true },
  storeReviewText: { type: String, required: true },

  storeReplyText: { type: String },

  createdBy: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: () => new Date() },
});

const ReviewStore: Model<IReview> = mongoose.models.ReviewStore || mongoose.model<IReview>('ReviewStore', reviewStoreSchema);
export default ReviewStore;
