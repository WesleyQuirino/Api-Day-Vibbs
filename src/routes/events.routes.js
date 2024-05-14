const { Router } = require("express");

const EventsController = require("../controllers/EventsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const eventsController = new EventsController();

const eventsRoutes = new Router();
//eventsRoutes.use(ensureAuthenticated);

eventsRoutes.post("/", ensureAuthenticated, eventsController.create);
eventsRoutes.put("/", ensureAuthenticated, eventsController.update);
eventsRoutes.get("/", ensureAuthenticated, eventsController.index);
eventsRoutes.get("/:id", ensureAuthenticated, eventsController.show);
eventsRoutes.delete("/:id", ensureAuthenticated, eventsController.delete);

module.exports = eventsRoutes;