import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('post', (table) => {
        table.increments('id');
        table.string('title').notNullable();
        table.string('content');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('post');
}

