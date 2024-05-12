const { Router } = require("express");

const EventsController = require("../controllers/EventsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const eventsController = new EventsController();

const eventsRoutes = new Router();
//eventsRoutes.use(ensureAuthenticated);

eventsRoutes.post("/", ensureAuthenticated, eventsController.create);
eventsRoutes.get("/", ensureAuthenticated, eventsController.show);
eventsRoutes.put("/", ensureAuthenticated, eventsController.update);
eventsRoutes.delete("/", ensureAuthenticated, eventsController.delete);

module.exports = eventsRoutes;