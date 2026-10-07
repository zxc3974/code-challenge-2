import { Router } from "express";
import {sampleEventData} from "../services/eventService.js"

const router = Router()

router.get("/health",(req,res)=>{
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
});
})

router.get("/events", (req,res)=>{
    res.json(sampleEventData)
})

export default router