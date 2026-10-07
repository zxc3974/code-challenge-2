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
    res.status(HTTP_STATUS.OK).json(sampleEventData)
})

router.get("/events/:id", (req, res) => {
    const id = Number(req.params.id)
    const event = sampleEventData.find((item) => item.id === id)

    return res.status(HTTP_STATUS.OK).json(event)

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
    return res.status(HTTP_STATUS.OK).json({...event, popularityScore, Tier})
})

router.put("/events/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing or invalid event id."
        })
    }

    const event = sampleEventData.find((item) => item.id === id)

    if (!event) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Event not found."
        })
    }

    const { name, date, capacity } = req.body

    if (name === undefined || date === undefined || capacity === undefined) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: name, date, or capacity."
        })
    }

    event.name = name
    event.date = date
    event.capacity = Number(capacity)

    return res.status(HTTP_STATUS.OK).json({
        message: "Event updated",
        data: event
    })
})

router.delete("/events/:id", (req, res) => {
    const id = Number(req.params.id)
    const eventIndex = sampleEventData.findIndex((item) => item.id === id)

    if (eventIndex === -1) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Event not found."
        })
    }

    const deletedEvent = sampleEventData.splice(eventIndex, 1)[0]

    return res.status(HTTP_STATUS.OK).json({
        message: "Event deleted",
        data: deletedEvent
    })
})

export default router
