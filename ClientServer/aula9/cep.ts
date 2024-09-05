import PromptSync from "prompt-sync";
const prompt = PromptSync();

async function run() {
  let cepPrompt = prompt("Digite um cep: ");
  let url = `https://brasilapi.com.br/api/cep/v2/${cepPrompt}`;

  let res = await fetch(url);
  let cep = await res.json();

  console.log(cep);
}

run();
