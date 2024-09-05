import promptSync from "prompt-sync";
const prompt = promptSync();

let res: string = prompt("Escreva uma palavra: ");
let count: number = 0;

for (let i = 0; i <= res.length; i++) {
  const element: string = res.charAt(i).toLocaleLowerCase();
  if (
    element == "a" ||
    element == "e" ||
    element == "i" ||
    element == "o" ||
    element == "u"
  ) {
    count++;
    console.log(element);
  }
}
console.log(count);
