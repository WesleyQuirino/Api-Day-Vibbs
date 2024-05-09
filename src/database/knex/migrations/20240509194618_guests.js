exports.up = knex => knex.schema.createTable("guests", table =>{
    table.increments("id");
    table.text("name");
    table.text("companion");
    table.text("guest_role");
    table.text("link");    
    table.text("email").unique();
    table.integer("phone_number");
    table.integer("event_id").references("id").inTable("events").onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("guests");