exports.up = knex => knex.schema.createTable("items", table =>{
    table.increments("id");
    table.text("event_id").references("id").inTable("events").onDelete("CASCADE");
    table.text("title");
    table.text("link");
    table.text("image");
    table.text("description");
    table.integer("price");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("items");