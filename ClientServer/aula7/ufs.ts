const url = "https://brasilapi.com.br/api/ibge/uf/v1";

async function buscaUfs() {
  let res = await fetch(url);
  let estados: any = await res.json();
  for (let index = 0; index < estados.length; index++) {
    let estado = estados[index];
    console.log(estado.id + " - " + estado.sigla + " - " + estado.nome);
  }
}

buscaUfs();
