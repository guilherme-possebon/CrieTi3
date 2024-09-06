import { client, dbQuery } from "./database";

async function main() {
  let nome: string = "Bola maneira";
  let valor: number = 89.9;

  let sql = `insert into produto (nome, valor) values ($1,$2)`;
  console.log(sql);
  let result = await dbQuery(sql, [nome, valor]);

  client.end();
}
main();
