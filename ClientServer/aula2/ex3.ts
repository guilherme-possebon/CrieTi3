import promptSync from "prompt-sync";
const prompt = promptSync();

let reverseString: string = "";
let palindromo: boolean = false;
let aux: string = "";

while (!palindromo) {
  let res: string = prompt("Escreva um palindromo: ");
  aux = res.split(/\s+/).join("");
  console.log(aux);
  for (let char of aux) {
    reverseString = char + reverseString;
  }
  if (aux == reverseString) {
    console.log(reverseString);
    palindromo = true;
  } else {
    reverseString = "";
  }
}
