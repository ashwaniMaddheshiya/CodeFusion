import mongoose, { Document, Schema } from "mongoose";

interface IRoom extends Document {
  name: string;
  users: mongoose.Types.ObjectId[]; // Updated to ObjectId array
  createdAt: Date;
}

const RoomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model<IRoom>("Room", RoomSchema);
export default Room;
