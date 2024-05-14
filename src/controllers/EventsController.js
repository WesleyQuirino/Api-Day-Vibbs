const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class EventsController{
    async create(request, response){
        const { title, acronym, address, date, hour } = request.body;
        const user_id = request.user.id;

        if(!title){
            throw new AppError("O titulo do evento é obrigatório!");
        };

        if(!acronym){
            throw new AppError("A sigla do evento é obrigatória!");
        };

        if(!address){
            throw new AppError("O endereço do evento é obrigatória!");
        };

        if(!date || !hour){
            throw new AppError("A data e a hora do evento são obrigatórias!");
        };
        
        await knex("events").insert({
            user_id,
            title,
            acronym,
            address,
            date,
            hour,
        });

        return response.status(200).json();
    };

    async update(request, response){
        const { title, acronym, address, date, hour } = request.body;
        const user_id = request.user.id;
        
        const event = await knex("events").where({user_id}).first();

        if(!event){
            throw new AppError("Você ainda não tem nenhum evento!");
        }

        title ? title : event.title;
        acronym ? acronym : event.acronym;
        address ? address : event.address;
        date ? date : event.date;
        hour ? hour : event.hour;

        try {
            await knex("events").update({title, acronym, address, date, hour}).where({user_id});
        } catch(error){
            throw new AppError("Algo deu errado!", 500);
        }

        return response.status(200).json();
    };

    async index(request, response){
        const user_id = request.user.id;

        const event = await knex("events").where({user_id});

        if(event){
            return response.status(200).json(event);
        } else{
            throw new AppError("Algo deu errado!");
        }
    };

    async show(request, response){
        const {id} = request.params;
        const user_id = request.user.id;

        const event = await knex("events").where({user_id}).where({id}).first();

        if(event){
            return response.status(200).json(event);
        } else{
            throw new AppError("Algo deu errado!");
        }
    };

    async delete(request, response){
        const {id} = request.params;
        const user_id = request.user.id;

        if(!await knex("events").select().where({user_id}).andWhere({id}).first()){
            throw new AppError("Algo deu errado!", 400);
        }
        try{
            await knex("events").delete().where({user_id}).andWhere({id});
        } catch(error){
            throw new AppError("Algo deu errado!", 500);
        }

        return response.status(200).json();
    }
}

module.exports = EventsController;