import promptSync from "prompt-sync";
const prompt = promptSync();

// let resultado: string = prompt("Qual o seu nome? ");

// console.log("Ola, " + resultado + "!");

// idade maior ou menor

let resultado: number = 0;

while (isNaN(resultado) || resultado == 0) {
  resultado = Number(prompt("Quantos anos voce tem? "));
}

if (resultado >= 18) {
  console.log("Você é maior de idade");
} else if (resultado <= 17) {
  console.log("Você é menor de idade");
}
