import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import Fastify from "fastify";
import { env } from "./config/env.js";
import { registerRoutes } from "./routes/index.js";

export async function buildServer() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: env.corsOrigin,
    credentials: true,
  });

  await app.register(jwt, {
    secret: env.jwtSecret,
  });

  await registerRoutes(app);

  return app;
}