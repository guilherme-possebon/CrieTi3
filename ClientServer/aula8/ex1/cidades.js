async function buscaCidades() {
  let selectQuery = document.querySelector("#estados");
  let estado = selectQuery.value;

  const url = `https://brasilapi.com.br/api/ibge/municipios/v1/${estado}?providers=dados-abertos-br,gov,wikipedia`;
  let res = await fetch(url);
  let cidades = await res.json();

  let html = "";

  for (let index = 0; index < cidades.length; index++) {
    const cidade = cidades[index];
    html += `
          <tr>
            <td>
            ${cidade.codigo_ibge}
            </td>
            <td>
            ${cidade.nome}
            </td>
          </tr>`;
  }

  document.getElementById("tbody").innerHTML = html;
}
const url = "https://brasilapi.com.br/api/ibge/uf/v1";

async function buscaUfs() {
  let res = await fetch(url);
  let estados = await res.json();

  let html = `<option value="">Selecione...</option>`;

  for (let index = 0; index < estados.length; index++) {
    let estado = estados[index];
    console.log(estado.id + " - " + estado.sigla + " - " + estado.nome);
    html += `<option value="${estado.sigla}">${estado.sigla} - ${estado.nome}</option>`;
  }

  document.getElementById("estados").innerHTML = html;
}

buscaUfs();
