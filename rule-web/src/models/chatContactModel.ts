import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

interface IChatContact extends Document {
  responsor: ObjectId;
  requester: ObjectId;
  relationship: string,
  lastMessage: string;
  lastMessageDate: Date;
  waitingForReply: boolean;
  createdAt: Date;
}

const chatContactSchema = new Schema<IChatContact>({
  responsor: { type: Schema.Types.ObjectId, required: true },
  requester: { type: Schema.Types.ObjectId, required: true },
  relationship: { type: String, required: true },
  lastMessage: { type: String, default: '' },
  lastMessageDate: { type: Date, default: () => new Date() },
  waitingForReply: { type: Boolean, default: true },
  createdAt: { type: Date, default: () => new Date() },
});

const ChatContact: Model<IChatContact> = mongoose.models.ChatContact || mongoose.model<IChatContact>('ChatContact', chatContactSchema);
export default ChatContact;
