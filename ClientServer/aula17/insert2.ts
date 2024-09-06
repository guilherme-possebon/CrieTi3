import { client, dbQuery } from "./database";

async function main() {
  let produto = {
    nome: "Bola demais",
    valor: 89.9,
  };

  let sql = `insert into produto (nome, valor) values ($1,$2)`;
  console.log(sql);
  let result = await dbQuery(sql, [produto.nome, produto.valor]);

  client.end();
}
main();
