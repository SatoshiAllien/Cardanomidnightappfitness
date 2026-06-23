import "dotenv/config";
import cors from "cors";
import express from "express";
import { healthRouter } from "./routes/health.js";
import { workoutsRouter } from "./routes/workouts.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/workouts", workoutsRouter);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});