import express from "express";
import EventController from "../controllers/event.controller";

const eventRouter = express.Router();

eventRouter.get("/events", EventController.getAllEvents);

export default eventRouter;
