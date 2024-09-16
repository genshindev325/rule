import mongoose, { Model, Document, Schema, Query, UpdateQuery, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IStore extends Document {
  email: string;
  password: string;
  storeID: string;
  storeName: string;
  storeGenre: string;
  foodGenre: string;
  cookingGenre: string;
  address: string;
  access1: string;
  access2: string;
  storeImages: string;
  description: string;
  monthlyRate: number;
  creditCard: string;
  rating: number;
  ratingCount: number;

  storeLat: number;
  storeLng: number;

  status: string;
  createdAt: Date;
  
  comparePassword: (password: string) => Promise<boolean>;
}

const storeSchema = new Schema<IStore>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  storeID: { type: String, default: '1111-2222-3333-4444' },
  storeName: { type: String, default: '' },
  storeGenre: { type: String },
  foodGenre: { type: String },
  cookingGenre: { type: String },
  address: { type: String },
  access1: { type: String },
  access2: { type: String },
  storeImages: { type: String },
  description: { type: String },
  monthlyRate: { type: Number, default: 5000 },
  creditCard: { type: String, default: ''},
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  storeLat: { type: Number, default: 35 },
  storeLng: { type: Number, default: 140 },
  status: {
    type: String,
    enum: ['active', 'inactive', 'blocked'],
    default: 'active',
  },
  createdAt: { type: Date, default: () => new Date() },
});

storeSchema.pre<IStore>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

storeSchema.pre<Query<IStore, IStore>>('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as UpdateQuery<IStore>; // Explicitly cast to UpdateQuery<IStore>

  // Check if the update directly modifies the 'password' field
  if (update.password && typeof update.password === 'string') {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(update.password, salt);
      this.setUpdate({ ...update, password: hashedPassword }); // Set the hashed password
    } catch (error) {
      return next(error as CallbackError);  // Explicitly cast error to CallbackError
    }
  }
  // Check if the update uses a $set modifier with 'password'
  else if (update.$set && typeof update.$set.password === 'string') {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(update.$set.password, salt);
      this.setUpdate({ ...update, $set: { ...update.$set, password: hashedPassword } }); // Update if nested in $set
    } catch (error) {
      return next(error as CallbackError);  // Explicitly cast error to CallbackError
    }
  }

  next();
});

storeSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const Store: Model<IStore> = mongoose.models.Store || mongoose.model<IStore>('Store', storeSchema);
export default Store;
