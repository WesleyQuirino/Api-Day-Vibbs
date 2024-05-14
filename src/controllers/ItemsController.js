const AppError = require("../utils/AppError");
const knex = require("../database/knex");

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
    };

    async index(request, response){
        const user_id = request.user.id;

        const {id} = await knex("events")
        .where({user_id})
        .first();

        if(!id){
            throw new AppError("Algo deu errado!");
        }

        const guest = await knex("items").select().where("event_id", id);

        if(guest){
            return response.status(200).json(guest);
        } else{
            throw new AppError("Algo deu errado!");
        }
    };

    async show(request, response){
        const {id} = request.params;
        const user_id = request.user.id;

        const event_id = await knex("events")
        .select("id")
        .where({user_id})
        .first();
        
        if(!event_id){
            throw new AppError("Algo deu errado!");
        }

        let guest;

        try{
            guest = await knex("guests").select().where("event_id", event_id.id).andWhere({id}).first();
        } catch (error){
            throw new AppError("Algo deu errado!");
        }
        
        if(!guest){
            throw new AppError("Algo deu errado!");
        }
        
        return response.status(200).json(guest);
    };

    async delete(request, response){
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

        try{
            await knex("items").delete().where({id});
        } catch(error){
            throw new AppError("Algo deu errado!");
        }

        return response.status(200).json();
    };
}

module.exports = ItemsController;