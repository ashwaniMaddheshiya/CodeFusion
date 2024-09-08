import express from "express";
import {
  allUsersInRoom,
  createRoom,
  joinRoom,
} from "../controller/roomCtrl.js";

const router = express.Router();

router.post("/create", createRoom);
router.post("/join", joinRoom);
router.get("/users/:roomId", allUsersInRoom);

export default router;
