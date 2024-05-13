const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class ItemsController{
    async create(request, response){
        return response.status(200).json({"message":"Iten create"});
    }
}

module.exports = ItemsController;