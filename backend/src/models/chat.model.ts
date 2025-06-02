import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  _id?: mongoose.Types.ObjectId;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
  requestId?: string;
}

export interface IChat extends Document {
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  requestId: {
    type: String,
    required: false,
  },
});

const ChatSchema = new Schema<IChat>(
  {
    messages: [MessageSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChat>('Chat', ChatSchema); 