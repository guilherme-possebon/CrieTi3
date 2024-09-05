import PromptSync from "prompt-sync";
const prompt = PromptSync();

interface Book {
  nameInterface: string;
  authorInterface: string;
  numberOfPagesInterface: number;
}

let books: Book[] = [];

function pressEnter() {
  prompt("Aperte enter para continuar");
}
function askBookIndex(): number {
  let index: number = -1;
  do {
    index = parseInt(prompt("Digite o numero do índece do livro"));
    if (index < 0 || index > books.length - 1) {
      console.log("Livro não encontrado");
    }
  } while (index < 0 || index > books.length - 1);
  return index;
}

function createBook() {
  console.clear();
  let name = prompt("Informe o nome do livro ");
  let author = prompt("Informe o nome do autor ");
  let pages: number = parseInt(prompt("Informe o numero de paginas "));

  books.push(makeBook(name, author, pages));

  console.log("Livro #" + (books.length - 1) + " incluido com sucesso");
  pressEnter();
}

function showBook() {
  console.clear();
  let index = askBookIndex();
  let book = books[index];
  console.log("Índece: " + index);
  console.log("Nome: " + book.nameInterface);
  console.log("Autor: " + book.authorInterface);
  console.log("Páginas: " + book.numberOfPagesInterface);
  pressEnter();
}
function editBook() {
  console.clear();
  let index = askBookIndex();
  let book = books[index];
  let name: string = prompt(
    "Informe o nome do livro: " + "(" + book.nameInterface + ")"
  );
  if (name == "") {
    name = book.nameInterface;
  }
  let author: string = prompt(
    "Informe o nome do autor: " + "(" + book.authorInterface + ")"
  );
  if (author == "") {
    author = book.authorInterface;
  }
  let pages: number = parseInt(
    prompt(
      "Informe o numero de paginas: " + "(" + book.numberOfPagesInterface + ")"
    )
  );
  if (pages == 0) {
    pages = book.numberOfPagesInterface;
  }
  pressEnter();
}

function deleteBook() {
  console.clear();
  let index = askBookIndex();
  delete books[index];
  console.log("Livro #" + index + " excluido com sucesso");
  pressEnter();
}

function showCatalog() {
  console.clear();
  books.forEach(function (book, index) {
    console.log(
      "# " +
        index +
        " | " +
        book.nameInterface +
        ", " +
        book.authorInterface +
        ", " +
        book.numberOfPagesInterface
    );
  });
  console.log("Lista do catalogo dos livros");
  pressEnter();
}

function makeBook(name: string, author: string, pages: number): Book {
  return {
    nameInterface: name,
    authorInterface: author,
    numberOfPagesInterface: pages,
  };
}

function run() {
  let option: number = 0;

  do {
    console.clear();
    console.log("Selecione a opção desejada");
    console.log("1 - Cadastrar livro");
    console.log("2 - Exibir livro ");
    console.log("3 - Editar livro ");
    console.log("4 - Excluir livro ");
    console.log("5 - Exibir catalogo de livros ");
    console.log("0 - Sair ");

    let answer: string = prompt("");
    if (answer == "") {
      option = -1;
    } else {
      option = Number(answer);
    }

    switch (option) {
      case 0:
        break;
      case 1:
        createBook();
        break;
      case 2:
        showBook();
        break;
      case 3:
        editBook();
        break;
      case 4:
        deleteBook();
        break;
      case 5:
        showCatalog();
        break;
      default:
        console.log("Opção não reconhecida!");
        prompt("Aperte enter para continuar");
        break;
    }
  } while (option != 0);
  console.log("Tchau");
}

run();
