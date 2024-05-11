const { Router } = require("express");

const EventsController = require("../controllers/EventsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const eventsController = new EventsController();

const eventsRoutes = new Router();

eventsRoutes.post("/", ensureAuthenticated, eventsController.create);
eventsRoutes.get("/", ensureAuthenticated, eventsController.show);
eventsRoutes.put("/", ensureAuthenticated, eventsController.update);

module.exports = eventsRoutes;