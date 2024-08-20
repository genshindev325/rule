import { Document, Schema, model } from 'mongoose';
import bcrypt from "bcryptjs";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
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

const User = model<IUser>('User', userSchema);
export default User;
