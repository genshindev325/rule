import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

interface IChatContact extends Document {
    responsor: ObjectId;
    requester: ObjectId;
    relationship: { type: String, enum: ["a-s", "a-u", "s-u"] },
    createdAt: Date;
}

const chatContactSchema = new Schema<IChatContact>({
    responsor: { type: Schema.Types.ObjectId, required: true },
    requester: { type: Schema.Types.ObjectId, required: true },
    relationship: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
});

const ChatContact: Model<IChatContact> = mongoose.models.ChatContact || mongoose.model<IChatContact>('ChatContact', chatContactSchema);
export default ChatContact;
