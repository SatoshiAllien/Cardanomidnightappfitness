import type { FastifyInstance } from "fastify";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware.js";
import {
  getConfigHandler,
  listAllBadgesHandler,
  listUsersHandler,
  updateConfigHandler,
} from "../controllers/adminController.js";
import { registerHandler, loginHandler } from "../controllers/authController.js";
import { listBadgesHandler } from "../controllers/badgeController.js";
import { meHandler, updateWalletHandler } from "../controllers/userController.js";
import {
  createWorkoutHandler,
  listWorkoutsHandler,
} from "../controllers/workoutController.js";

export async function registerRoutes(app: FastifyInstance) {
  app.get("/api/health", async () => ({ status: "ok" }));

  app.post("/api/auth/register", registerHandler);
  app.post("/api/auth/login", loginHandler);

  app.get("/api/me", { preHandler: authMiddleware }, meHandler);
  app.put("/api/me/wallet", { preHandler: authMiddleware }, updateWalletHandler);

  app.post("/api/workouts", { preHandler: authMiddleware }, createWorkoutHandler);
  app.get("/api/workouts", { preHandler: authMiddleware }, listWorkoutsHandler);

  app.get("/api/badges", { preHandler: authMiddleware }, listBadgesHandler);

  app.get("/api/admin/users", { preHandler: adminMiddleware }, listUsersHandler);
  app.get("/api/admin/badges", { preHandler: adminMiddleware }, listAllBadgesHandler);
  app.get("/api/admin/config", { preHandler: adminMiddleware }, getConfigHandler);
  app.put("/api/admin/config", { preHandler: adminMiddleware }, updateConfigHandler);
}