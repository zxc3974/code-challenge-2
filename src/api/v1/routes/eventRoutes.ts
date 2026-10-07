import { Router } from "express";

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
    res.json()
})

export default router