const { Router } = require("express");

const userRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const eventsRouter = require("./events.routes");

const routes = Router();
routes.use("/users", userRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/events", eventsRouter);

module.exports = routes;