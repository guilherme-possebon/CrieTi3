import promptSync from "prompt-sync";
const prompt = promptSync();

interface Book {
  titleInterface: string;
  authorInterface: string;
  numberOfPagesInterface: number;
  lauchYearInterface: number;
}

let book: Book[] = [];
book.push(makeBook("", "", 0, 0));

function makeBook(
  title: string,
  author: string,
  numberOfPages: number,
  lauchYear: number
): Book {
  return {
    titleInterface: title,
    authorInterface: author,
    numberOfPagesInterface: numberOfPages,
    lauchYearInterface: lauchYear,
  };
}
function editBook() {
  let menu: number = 0;
  let stopEditing = false;
  while (!stopEditing) {
    let cont: number = 0;
    for (let index = 0; index < book.length; index++) {
      console.log(
        index +
          " - Titulo " +
          book[index].titleInterface +
          "\nAutor " +
          book[index].authorInterface +
          "\nNumero de paginas " +
          book[index].numberOfPagesInterface +
          "\nAno lançado " +
          book[index].lauchYearInterface +
          "\n"
      );
    }

    menu = parseInt(prompt("Escolha o numero do livro que deseja editar: "));
    console.log(cont, 1203912391293);

    if (menu == cont) {
      let title: string = prompt("Escreva o titulo do livro: ");

      let author: string = prompt("Escreva o nome do autor do livro: ");

      let numberOfPages: number = parseInt(
        prompt("Digite o numero de paginas: ")
      );
      while (isNaN(numberOfPages)) {
        numberOfPages = parseInt(prompt("Digite o numero de paginas: "));
      }

      let lauchYear: number = parseInt(prompt("Digite o ano de lançamento: "));

      while (isNaN(lauchYear)) {
        lauchYear = parseInt(prompt("Digite o ano de lançamento: "));
      }

      book[cont] = {
        titleInterface: title,
        authorInterface: author,
        numberOfPagesInterface: numberOfPages,
        lauchYearInterface: lauchYear,
      };
    }
  }
}

let menu: number = 0;
while (menu != 3) {
  console.log(
    "\n\n[1] - Adicionar livro" + "\n[2] - Editar um livro" + "\n[3] - Sair\n"
  );
  menu = parseInt(prompt("Escolha um numero: "));
  switch (menu) {
    case 1:
      let title: string = prompt("Escreva o titulo do livro: ");

      let author: string = prompt("Escreva o nome do autor do livro: ");

      let numberOfPages: number = parseInt(
        prompt("Digite o numero de paginas: ")
      );
      while (isNaN(numberOfPages)) {
        numberOfPages = parseInt(prompt("Digite o numero de paginas: "));
      }

      let lauchYear: number = parseInt(prompt("Digite o ano de lançamento: "));

      while (isNaN(lauchYear)) {
        lauchYear = parseInt(prompt("Digite o ano de lançamento: "));
      }

      book.push(makeBook(title, author, numberOfPages, lauchYear));
      break;
    case 2:
      editBook();
      break;
    case 3:
      console.log("Desligando sistema");
      break;
    default:
      break;
  }
}
