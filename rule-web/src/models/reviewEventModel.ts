import mongoose, { Document, Schema, Model, ObjectId, mongo } from 'mongoose';

interface IReview extends Document {
  eventId: ObjectId;
  eventReviewText: string;
  eventRating: number;

  createdBy: ObjectId;
  createdAt: Date;
}

const reviewEventSchema = new Schema<IReview>({
  eventId: { type: mongoose.Types.ObjectId, required: true, ref: 'Event' },
  eventRating: { type: Number },
  eventReviewText: { type: String },

  createdBy: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: () => new Date() },
});

const ReviewEvent: Model<IReview> = mongoose.models.ReviewEvent || mongoose.model<IReview>('ReviewEvent', reviewEventSchema);
export default ReviewEvent;
