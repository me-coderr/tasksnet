import mongoose, { Document, Model, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string | null;
  isCompleted: boolean;
}

const taskSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

export { Task, ITask };
