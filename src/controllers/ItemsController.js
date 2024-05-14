const AppError = require("../utils/AppError");
const knex = require("../database/knex");

// table.text("event_id").references("id").inTable("events").onDelete("CASCADE");
// table.text("title");
// table.text("link");
// table.text("image");
// table.text("description");
// table.integer("price");

class ItemsController{
    async create(request, response){
        const {title, link, image, description, price} = request.body;
        const user_id = request.user.id;

        if(!title || !link || !image || !description || !price){
            throw new AppError("Todos os campos são obrigatórios!")
        }

        const {id} = await knex("events").select().where({user_id}).first();

        try{
            await knex("items").insert({
                event_id: id,
                title,
                link,
                image,
                description,
                price
            });
        } catch(error){
            throw new AppError("Algo deu errado!");
        }
        return response.status(200).json();
    };

    async update(request, response){
        const {title, link, image, description, price} = request.body;
        const {id} = request.params;
        const user_id = request.user.id;
        
        const consulta = await knex("events")
        .join("items", "items.event_id", "events.id")
        .andWhere("items.id", id)
        .select(["items.title","items.link","items.image","items.description","items.price"])
        .where({user_id})
        .first();

        if(!consulta){
            throw new AppError("Algo deu errado!");
        }
        console.log({title, link, image, description, price});
        title ? title: consulta.title;
        link ? link: consulta.link;
        image ? image: consulta.image;
        description ? description: consulta.description;
        price ? price: consulta.price;

        try{
            
            await knex("items").update({title, link, image, description, price}).where({id});
        } catch(error){
            throw new AppError("Algo deu errado!");
        }

        return response.status(200).json({title, link, image, description, price});

    }
}

module.exports = ItemsController;