import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

interface IChatMessage extends Document {
  responsor: ObjectId;
  requester: ObjectId;
  relationship: { type: String, enum: ["a-s-s", "a-s-r", "a-u-s", "a-u-r", "s-u-s", "s-u-r"] },
  message: string;
  eventName: string;
  createdAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>({
  responsor: { type: Schema.Types.ObjectId, required: true },
  requester: { type: Schema.Types.ObjectId, required: true },
  relationship: { type: String, required: true },
  message: { type: String },
  eventName: { type: String },
  createdAt: { type: Date, default: () => new Date() },
});

const ChatMessage: Model<IChatMessage> = mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);
export default ChatMessage;
