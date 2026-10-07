import { Router } from "express";
import {
    healthCheck,
    getEvents,
    getEventById,
    getEventPopularity,
    createEvent,
    updateEvent,
    deleteEvent,
} from "../controllers/eventController.js";

const router = Router()

router.get("/health", healthCheck)
router.get("/events", getEvents)
router.get("/events/:id/popularity", getEventPopularity)
router.get("/events/:id", getEventById)
router.post("/events", createEvent)

router.put("/events/:id", updateEvent)
router.delete("/events/:id", deleteEvent)

export default router
