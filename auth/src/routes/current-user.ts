import jwt from "jsonwebtoken";
import express from "express";
import { currentUser } from "../middlewares/current-user";
jwt;

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null});
});

export { router as currentUserRouter };
