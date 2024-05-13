const { Router } = require("express");

const GuestsController = require("../controllers/GuestsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const guestsController = new GuestsController();

const guestsRoutes = new Router();

guestsRoutes.use(ensureAuthenticated);

guestsRoutes.post("/", guestsController.create);
guestsRoutes.put("/:id", guestsController.update);
guestsRoutes.delete("/:id", guestsController.delete);

module.exports = guestsRoutes;