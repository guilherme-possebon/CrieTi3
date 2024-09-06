import { Client } from "pg";

export const client: Client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "crieTi3",
});

client.connect();

export async function dbQuery(sql: string, values?: any[]) {
  let result = await client.query(sql, values);

  return result.rows;
}
