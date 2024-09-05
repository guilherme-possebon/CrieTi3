import PromptSync from "prompt-sync";
const prompt = PromptSync();

async function fetchEstados() {
  let validacao: boolean = false;
  while (!validacao) {
    let siglaUF = prompt("Escreva a sigla do estado: ");
    let resultado: Response;
    let cidades: any;
    if (siglaUF.length === 2) {
      const url = `https://brasilapi.com.br/api/ibge/municipios/v1/${siglaUF}?providers=dados-abertos-br,gov,wikipedia`;
      resultado = await fetch(url);
      cidades = await resultado.json();

      if (cidades?.type !== "not_found") {
        for (let index = 0; index < cidades.length; index++) {
          const cidade = cidades[index];

          console.log(cidade.codigo_ibge + " - " + cidade.nome);
          validacao = true;
        }
      } else {
        console.error("Estado não encontrado");
      }
    } else {
      console.error("Escreva dois caracteres para ver se existe!");
    }
  }
}

fetchEstados();
