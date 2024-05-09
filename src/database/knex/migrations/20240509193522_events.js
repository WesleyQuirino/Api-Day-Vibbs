exports.up = knex => knex.schema.createTable("events", table => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.text("title");
    table.text("acronym");
    table.text("address");
    table.timestamp("date");
    table.timestamp("hour");
    table.text("background_image");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("events");