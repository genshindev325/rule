import mongoose, { Document, Schema, Model, ObjectId, mongo } from 'mongoose';

interface IReview extends Document {
    eventId: ObjectId;
    eventReviewText: string;
    eventRating: number;
    storeId: ObjectId; // Check if this field is necessary
    storeReviewText: string;
    storeRating: number;

    storeReplyText: string;
    
    createdBy: ObjectId;
    createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
    eventId: { type: mongoose.Types.ObjectId, required: true },
    eventRating: { type: Number },
    eventReviewText: { type: String },
    storeId: { type: mongoose.Types.ObjectId, required: true }, // Check if this field is necessary
    storeRating: { type: Number },
    storeReviewText: { type: String },

    storeReplyText: {type: String },

    createdBy: { type: mongoose.Types.ObjectId, required: true },
    createdAt: { type: Date, default: () => new Date() },
});

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Event', reviewSchema);
export default Review;
