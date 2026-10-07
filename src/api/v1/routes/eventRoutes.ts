import { Router } from "express";
import { sampleEventData } from "../services/eventService.js"
import type { Event } from "../types/event.js";
import { HTTP_STATUS } from "../../../constants/httpConstants.js";

const router = Router()

router.get("/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
})

router.get("/events", (req, res) => {
    res.json(sampleEventData)
})

router.get("/events/:id", (req, res) => {
    const id = Number(req.params.id)
    const event = sampleEventData.find((item) => item.id === id)

    return res.json(event)

})

router.get("/events/:id/popularity", (req, res) => {
    const id = Number(req.params.id)
    const event = sampleEventData.find((item) => item.id === id)

    if (!event) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Event not found."
        })
    }

    const registrationCount = event.registrationCount
    const capacity = event.capacity

    const popularityScore = (registrationCount / capacity) * 100
    let Tier: string

    if (popularityScore >= 90) {
        Tier = "Hot"
    } else if (popularityScore >= 70) {
        Tier = "Popular"
    } else if (popularityScore >= 50){
        Tier = "Moderate"
    }else if (popularityScore >= 25){
        Tier = "Building"
    }else {
        Tier = "New"
    }
    return res.json({...event, popularityScore, Tier})
})

export default router