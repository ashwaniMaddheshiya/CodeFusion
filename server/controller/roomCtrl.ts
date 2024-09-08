import { Request, Response } from "express";
import Room from "../models/Room.js";
import mongoose from "mongoose";

// Create a new room
export const createRoom = async (req: Request, res: Response) => {
  const { name, userId } = req.body;

  if (!name || !userId) {
    return res
      .status(400)
      .json({ error: "Room name and user ID are required" });
  }

  try {
    const isRoom = await Room.findOne({ name });
    if (isRoom) {
      return res
        .status(400)
        .json({ error: "Room name has already is in use, Try something else" });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const room = new Room({
      name,
      users: [userObjectId],
    });

    await room.save();
    res.status(201).json({ message: "Room Created Successfully", data: room });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create room",
      message: (error as Error).message,
    });
  }
};

// Join a room
export const joinRoom = async (req: Request, res: Response) => {
  const { roomId, userId } = req.body;

  if (!roomId || !userId) {
    return res.status(400).json({ error: "Room ID and user ID are required" });
  }

  try {
    const room = await Room.findById({ _id: roomId });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (room.users.includes(userId)) {
      return res.status(400).json({ error: "User is already in the room" });
    }

    room.users.push(userId);
    await room.save();

    res.status(200).json({ message: "Joined", data: room });
  } catch (error) {
    res.status(500).json({
      error: "Failed to join room",
      message: (error as Error).message,
    });
  }
};

// Get all users in a room
export const allUsersInRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId).populate("users");

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json({ message: "", data: room.users });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve users",
      message: (error as Error).message,
    });
  }
};
