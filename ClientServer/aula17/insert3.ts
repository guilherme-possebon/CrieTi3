import { client, dbQuery } from "./database";

async function main() {
  let produto = {
    nome: "Bola demais",
    valor: 89.9,
  };

  let produtos = [
    { nome: "Bola abesurda", valor: 159.9 },
    { nome: "Ultra bola", valor: 249.9 },
  ];

  for (let index = 0; index < produtos.length; index++) {
    const produto = produtos[index];
    let sql = `insert into produto (nome, valor) values ($1, $2)`;
    let result = await dbQuery(sql, [produto.nome, produto.valor]);
  }

  client.end();
}
main();
