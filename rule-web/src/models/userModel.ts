import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    email: string;
    password: string;
    createdAt: Date;

    userID: string;
    userName: string;
    nickname: string;
    gender: string;
    birthday: Date;
    avatar: string;

    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },

    userID: { type: String, default: "1111-2222-3333-44444"},
    userName: { type: String },
    nickname: { type: String },
    gender: { type: String },
    birthday: { type: Date },
    avatar: { type: String },
});

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
  
userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
}

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;