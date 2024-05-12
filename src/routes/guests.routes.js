const { Router } = require("express");

const GuestsController = require("../controllers/GuestsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const guestsController = new GuestsController();

const guestsRoutes = new Router();

guestsRoutes.post("/", ensureAuthenticated, guestsController.create);
guestsRoutes.put("/:id", ensureAuthenticated, guestsController.update);

module.exports = guestsRoutes;