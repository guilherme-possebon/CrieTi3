import { Client } from "pg";

const client: Client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "crieTi3",
});

// Pode usar assim tbm
// client.connect();
// client
//   .query("Select * from produto")
//   .then((results: any) => {
//     const result = results.rows;
//     console.table(result);
//   })
//   .finally(() => client.end());

client.connect();

async function main() {
  const sql = "select * from produto";
  const resultSQL = await client.query(sql);
  const result = resultSQL.rows;
  console.table(result);
  client.end();
}
main();
