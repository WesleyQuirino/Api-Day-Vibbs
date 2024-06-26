const { Router } = require("express");

const userRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const eventsRouter = require("./events.routes");
const guestsRouter = require("./guests.routes");
const itemsRouter = require("./items.routes");

const routes = Router();

routes.use("/users", userRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/events", eventsRouter);
routes.use("/guests", guestsRouter);
routes.use("/items", itemsRouter);

module.exports = routes;