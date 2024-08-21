import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from "bcryptjs";

// Define user roles
enum UserRole {
    Admin = 'admin',
    Store = 'store',
    User = 'user',
}

export interface IUser extends Document {
    email: string;
    password: string;
    role: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.User },
},
{
    discriminatorKey: 'role',
    timestamps: true
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

// Create a base user model
const User = mongoose.model('User', userSchema);

// Define different profile schemas based on roles
const adminProfileSchema = new Schema({
    adminSpecificField: { type: String }
}, { discriminatorKey: 'role', timestamps: true });
  
const storeProfileSchema = new Schema({
    storeName: { type: String, required: true },
    storeGenre: { type: String },
    foodGenre: { type: String },
    cookingGenre: { type: String },
    address: { type: String, required: true },
    access: { type: String },
    storeImages: { type: String},
    explanatoryText: { type: String},
}, { discriminatorKey: 'role', timestamps: true });
  
const userProfileSchema = new Schema({
    nickName: { type: String },
    gender: { type: String },
    birthday: { type: Date },
    avatar: { type: String },
    uid: { type: String },
}, { discriminatorKey: 'role', timestamps: true });

// Define discriminators
const Admin = User.discriminator('Admin', adminProfileSchema);
const Store = User.discriminator('Store', storeProfileSchema);
const RegularUser = User.discriminator('User', userProfileSchema);

export { User, Admin, Store, RegularUser, UserRole };