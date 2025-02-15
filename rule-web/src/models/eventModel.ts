import mongoose, { Document, Schema, Model } from 'mongoose';

interface IEvent extends Document {
  eventName: string;
  category: string;
  coverImage: string;
  description: string;
  eventDate: Date;
  eventStartTime: Date;
  eventEndTime: Date;
  maleTotal: number;
  males: number;
  maleFee: number;
  femaleTotal: number;
  females: number;
  femaleFee: number;
  rating: number;
  ratingCount: number;
  totalEarnings: number;
  store: mongoose.ObjectId;
  status: string;
  createdAt: Date;
}

const eventSchema = new Schema<IEvent>({
  eventName: { type: String, required: true },
  category: { type: String, required: true },
  coverImage: { type: String },
  description: { type: String },
  eventDate: { type: Date },
  eventStartTime: { type: Date, },
  eventEndTime: { type: Date, },
  maleTotal: { type: Number, required: true },
  males: { type: Number, default: 0 },
  maleFee: { type: Number, required: true },
  femaleTotal: { type: Number, required: true },
  females: { type: Number, default: 0 },
  femaleFee: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  store: { type: Schema.Types.ObjectId, required: true, ref: 'Store' },
  status: {
    type: String,
    enum: ["active", "canceled"],
    default: "active"
  },

  createdAt: { type: Date, default: () => new Date() },
});

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
export default Event;
