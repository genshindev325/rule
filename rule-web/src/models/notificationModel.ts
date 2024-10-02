import mongoose, { Document, Schema, Model } from 'mongoose';

interface INotification extends Document {
  entityId: mongoose.ObjectId;
  entityName: string;
  role: string;
  message: string;
  show: string;
  status: string;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  entityId: { type: Schema.Types.ObjectId, require: true, refPath: 'role' },
  entityName: { type: String, require: true },
  role: { type: String, require: true },
  message: { type: String, require: true },
  show: { type: String, require: true },
  status: { type: String, require: true, default: 'unread' },
  createdAt: { type: Date, default: () => new Date() },
});

const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', notificationSchema);
export default Notification;