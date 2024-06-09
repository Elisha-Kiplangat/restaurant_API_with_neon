import "dotenv/config";
import { Client } from "pg";
import * as schema from "./schema"
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';


const sql = neon(process.env.DATABASE_URL!);

export const client = new Client({
    connectionString: process.env.Database_URL as string,   //get the database url from the environment
})

const main = async () => {
    await client.connect();  //connect to the database
}
main();

const db = drizzle(sql, { schema, logger: true })  //create a drizzle instance

export default db;  //export the drizzle instance

