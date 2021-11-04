import express from "express";
import { verifyToken } from "../database/firebase.js";

export const verifyJWTToken = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    const resBody = {
      error: "Missing token",
    };
    res.json(resBody);
    res.status(400);
    return;
  } else {
    const user = await verifyToken(token);
    if (user.errorInfo) {
      res.json(user.errorInfo);
      res.status(400);
    } else if (user.uid) {
      const resBody = {
        uid: user.uid,
      };
      res.json(resBody);
      res.status(200);
    } else {
      const resBody = {
        error: "Something went wrong",
      };
      res.status(500);
    }
  }
};
