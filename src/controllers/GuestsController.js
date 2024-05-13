const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class GuestsController{
    async create(request, response){
        const {name, companion, guest_role, link, email, phone_number} = request.body;
        const user_id = request.user.id;
        const {id} = await knex("events").select("id").where({user_id}).first();

        if(!name || !companion || !guest_role || !link || !email || !phone_number){
            throw new AppError("Todos os campos devem estar preenchidos!");
        }

        const checkEmail = await knex("guests").where({email}).first();

        if(checkEmail){
            throw new AppError("Convidado já cadastrado!");
        }

        try{
            await knex("guests").insert({
                name,
                companion,
                guest_role,
                link,
                email,
                phone_number,
                event_id: id
            });
        }catch(error){
            throw new AppError(response.message.error);
        }
        
        response.status(200).json();
    }

    async update(request, response){
        const {name, companion, guest_role, link, email, phone_number} = request.body;
        const user_id = request.user.id;
        const {id} = request.params;
        const guest = await knex("guests").where({id}).first();


        const consulta = await knex("events")
        .join("guests", "guests.event_id", "events.id")
        .andWhere("guests.id", id)
        .select()
        .where({user_id})
        .first();

        if(!consulta){
            throw new AppError("Algo deu errado!");
        }

        name ? name : guest.name;
        companion ? companion : guest.companion;
        guest_role ? guest_role : guest.guest_role;
        link ? link :   guest.link;
        email ? email : guest.email;
        phone_number ? phone_number : guest.phone_number;
        
        try {
            await knex("guests").update({name, companion, guest_role, link, email, phone_number}).where({id});
        } catch(error){
            throw new AppError("Algo deu errado!", 500);
        }

        return response.status(200).json();
    }

    async delete(request, response){
        const {id} = request.params;

        const user_id = request.user.id;

        const consulta = await knex("events")
        .join("guests", "guests.event_id", "events.id")
        .andWhere("guests.id", id)
        .select()
        .where({user_id})
        .first();

        if(!consulta){
            throw new AppError("Algo deu errado!");
        }

        try {
            await knex("guests").delete().where({id});
        } catch(error){
            throw new AppError(response.message.error);
        }

        return response.status(200).json();
    }
}

module.exports = GuestsController;