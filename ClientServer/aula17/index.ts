import { dbQuery, client } from "./database";

async function main() {
  let sql1 = "select * from produto";
  let result = await dbQuery(sql1);
  console.table(result);

  let id = 1;
  let sql = "select * from produto where id = $1;";
  let result2 = await dbQuery(sql, [id]);

  console.table(result2);
  client.end();
}
main();
