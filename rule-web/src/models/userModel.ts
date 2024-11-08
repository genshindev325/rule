import mongoose, { Model, Document, Schema, Query, UpdateQuery, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  userID: string;
  nickname: string;
  gender: string;
  birthday: Date;
  avatar: string;
  verifys: string[];
  phoneNumber: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  status: string;
  createdAt: Date;
  creditCard: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userID: { type: String, default: "1111-2222-3333-44444" },
  nickname: { type: String },
  gender: { type: String, enum: ["male", "female"], },
  birthday: { type: Date },
  avatar: { type: String },
  verifys: { type: [String], default: [] },
  phoneNumber: { type: String },  
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  status: { type: String, enum: ["active", "inactive", "blocked"], default: "active" },
  createdAt: { type: Date, default: () => new Date() },
  creditCard: { type: String },
});

// Hash password before saving if modified
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.pre<Query<IUser, IUser>>('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as UpdateQuery<IUser>;

  if (update.password && typeof update.password === 'string') {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(update.password, salt);
      this.setUpdate({ ...update, password: hashedPassword });
    } catch (error) {
      return next(error as CallbackError);
    }
  }
  else if (update.$set && typeof update.$set.password === 'string') {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(update.$set.password, salt);
      this.setUpdate({ ...update, $set: { ...update.$set, password: hashedPassword } });
    } catch (error) {
      return next(error as CallbackError);
    }
  }

  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
