import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants.js";
import { sampleEventData } from "../services/eventService.js";
import type { Event } from "../types/event.js";

export function healthCheck(_req: Request, res: Response) {
    return res.status(HTTP_STATUS.OK).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    })
}

export function getEvents(_req: Request, res: Response) {
    return res.status(HTTP_STATUS.OK).json(sampleEventData)
}

export function getEventById(req: Request, res: Response) {
    const id = Number(req.params.id)
    const event = sampleEventData.find((item) => item.id === id)

    return res.status(HTTP_STATUS.OK).json(event)
}

export function getEventPopularity(req: Request, res: Response) {
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
    } else if (popularityScore >= 50) {
        Tier = "Moderate"
    } else if (popularityScore >= 25) {
        Tier = "Building"
    } else {
        Tier = "New"
    }

    return res.status(HTTP_STATUS.OK).json({ ...event, popularityScore, Tier })
}

export function createEvent(req: Request, res: Response) {
    const { name, date, capacity } = req.body

    if (name === undefined) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: name" })
    }
    if (date === undefined) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: date" })
    }
    if (capacity === undefined) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: capacity" })
    }

    const newEvent: Event = {
        id: Math.max(0, ...sampleEventData.map((event) => event.id)) + 1,
        name,
        date,
        capacity: Number(capacity),
        registrationCount: 0,
    }
    sampleEventData.push(newEvent)

    return res.status(HTTP_STATUS.CREATED).json({
        message: "Event created",
        data: newEvent,
    })
}

export function updateEvent(req: Request, res: Response) {
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
}

export function deleteEvent(req: Request, res: Response) {
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
}
