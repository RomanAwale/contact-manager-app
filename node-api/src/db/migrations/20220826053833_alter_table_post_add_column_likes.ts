import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('post', (table) =>{
        table.integer('likes').defaultTo(0);
        table.boolean('is_Seen').defaultTo(false);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('post', (table) =>{
        table.dropColumn('likes');
        table.dropColumn('is_seen');
    });
}

