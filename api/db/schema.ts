import { Schema, model } from 'mongoose';

export const storySchema = new Schema({
  name: String,
  author: Schema.ObjectId,
  description: String,
  photo: String,
  audio: String,
});

export const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

userSchema.statics.findUserByEmail = function (email: string) {
  return this.find({ email });
};

export const Story = model('story', storySchema);
export const User = model('user', userSchema);
