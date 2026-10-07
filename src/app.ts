import express from "express";
import eventRoutes from "./api/v1/routes/eventRoutes.js"

const app = express();

app.use(express.json());
app.use("/api/v1", eventRoutes)

export default app;