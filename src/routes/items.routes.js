const { Router } = require("express");

const ItemsController = require("../controllers/ItemsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const itemsRoutes = new Router();
const itemsController = new ItemsController();

itemsRoutes.use(ensureAuthenticated);
itemsRoutes.post("/", itemsController.create);

module.exports = itemsRoutes;