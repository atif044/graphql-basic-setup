import { Schema, Model, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  name:string
  isValidPassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name:{type:String,required:true}
});

// Pre-save middleware to hash password
UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password') || typeof this.password !== 'string') return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error('Error while hashing the password');
  }
});

// Method to validate password
UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  if (!this.password || typeof this.password !== 'string') {
    throw new Error('Invalid password type');
  }
  return bcrypt.compare(password, this.password);
};

export const User: Model<IUser> = model<IUser>('User', UserSchema);
