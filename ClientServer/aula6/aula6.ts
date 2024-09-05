import { Endereco } from "./Endereco";
import { Pessoa } from "./Pessoa";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

let pessoas: Pessoa[] = [];

function pressEnter() {
  prompt("Aperte enter para continuar");
}

function askPersonIndex(): number {
  console.clear();
  let index: number = -1;
  do {
    listAllPeople();
    index = parseInt(prompt("Digite o numero do índice da pessoa: "));
    if (index < 0 || index >= pessoas.length) {
      console.log("Pessoa não encontrada");
    }
  } while (index < 0 || index >= pessoas.length);
  return index;
}
function askAddressIndex(personIndex: number): number {
  console.clear();
  let pessoa: Pessoa = pessoas[personIndex];

  let index: number = -1;
  do {
    showAddress(personIndex);
    index = parseInt(prompt("Digite o numero do índice do endereço: "));
    if (index < 0 || index >= pessoa.enderecos.length) {
      console.log("Endereço não encontrado");
    }
  } while (index < 0 || index >= pessoa.enderecos.length);
  return index;
}

function askNumberIndex(personIndex: number): number {
  console.clear();
  let pessoa: Pessoa = pessoas[personIndex];
  let index: number = -1;
  do {
    pessoa.telefones.forEach((fone, i) => {
      console.log("Índice: " + i + " | Numero de telefone: " + fone);
    });
    index = parseInt(
      prompt("Digite o numero do índice do numero de telefone: ")
    );
    if (index < 0 || index >= pessoa.telefones.length) {
      console.log("Telefone não encontrado");
    }
  } while (index < 0 || index >= pessoa.telefones.length);
  return index;
}

function addPerson() {
  console.clear();
  let pessoa: Pessoa = new Pessoa();

  pessoa.nome = prompt("Digite o seu nome: ");
  pessoa.sobrenome = prompt("Digite o seu sobrenome: ");
  pessoa.cpf = prompt("Digite o seu cpf: ");
  pessoa.dataNascimento = prompt("Digite a sua data de nascimento: ");

  pessoas.push(pessoa);
}

function addEndereco() {
  let askedIndex: number = askPersonIndex();
  let pessoa: Pessoa = pessoas[askedIndex];

  let endereco: Endereco = new Endereco();

  endereco.logradouro = prompt("Digite o seu logradouro: ");
  endereco.numero = parseInt(prompt("Digite o seu numero: "));
  endereco.complemento = prompt("Digite o complemento: ");
  endereco.bairro = prompt("Digite o seu bairro: ");
  endereco.cep = parseInt(prompt("Digite o seu cep: "));
  endereco.cidade = prompt("Digite o seu cidade: ");
  endereco.estado = prompt("Digite o seu estado: ");
  endereco.pais = prompt("Digite o seu pais: ");

  pessoa.addEndereco(endereco);
}

function addNumeroTelefone() {
  let askedIndex: number = askPersonIndex();
  let pessoa: Pessoa = pessoas[askedIndex];

  pessoa.addTelefone(prompt("Digite o seu numero de telefone: "));
}

function listAllPeople() {
  pessoas.forEach((pessoa, index) => {
    console.log("Índice: " + index);
    console.log("Nome da pessoa: " + pessoa.nome);
    console.log("Sobrenome da pessoa: " + pessoa.sobrenome);
    console.log("Data de nascimento da pessoa: " + pessoa.dataNascimento);
    console.log("CPF da pessoa: " + pessoa.cpf);
  });
}

function listEverythingOfPeople() {
  pessoas.forEach((pessoa, personIndex) => {
    console.log("Índice da pessoa: " + personIndex);
    console.log("Nome da pessoa: " + pessoa.nome);
    console.log("Sobrenome da pessoa: " + pessoa.sobrenome);
    console.log("Data de nascimento da pessoa: " + pessoa.dataNascimento);
    console.log("CPF da pessoa: " + pessoa.cpf);
    showAddress(personIndex);
    showNumber(personIndex);
  });
}

function showAddress(personIndex: number) {
  let pessoa: Pessoa = pessoas[personIndex];

  pessoa.enderecos.forEach((endereco, index) => {
    console.log("Índice do endereco: " + index);
    console.log("Logradouro: " + endereco.logradouro);
    console.log("Número: " + endereco.numero);
    console.log("Complemento: " + (endereco.complemento ?? ""));
    console.log("Bairro: " + endereco.bairro);
    console.log("CEP: " + endereco.cep);
    console.log("Cidade: " + endereco.cidade);
    console.log("Estado: " + endereco.estado);
    console.log("País: " + endereco.pais);
  });
}

function showNumber(personIndex: number) {
  let pessoa: Pessoa = pessoas[personIndex];
  pessoa.telefones.forEach((fone, index) => {
    console.log("Índice do telefone: " + index);
    console.log("Número de telefone: " + fone);
  });
}

function showPerson() {
  let askedIndex: number = askPersonIndex();
  let pessoa: Pessoa = pessoas[askedIndex];

  console.log("Índice: " + askedIndex);
  console.log("Nome: " + pessoa.nome);
  console.log("Sobrenome: " + pessoa.sobrenome);
  console.log("Data de nascimento: " + pessoa.dataNascimento);
  console.log("CPF: " + pessoa.cpf);
  showAddress(askedIndex);
  showNumber(askedIndex);
}

function editPeson() {
  let askedPersonIndex: number = askPersonIndex();
  let pessoa: Pessoa = pessoas[askedPersonIndex];

  let askedAddressIndex: number = askAddressIndex(askedPersonIndex);
  let endereco = pessoa.enderecos[askedAddressIndex];
  if (isNaN(askedAddressIndex)) {
    endereco = new Endereco();
  }

  let askedNumberIndex: number = askNumberIndex(askedPersonIndex);
  let fone = pessoa.telefones[askedNumberIndex];

  let nome: string = prompt("Digite o nome da pessoa (" + pessoa.nome + ") ");
  if (nome == "") {
    nome = pessoa.nome;
  }

  let sobrenome: string = prompt(
    "Digite o sobrenome da pessoa (" + pessoa.sobrenome + ") "
  );
  if (sobrenome == "") {
    sobrenome = pessoa.sobrenome;
  }

  let cpf: string = prompt("Digite o cpf da pessoa (" + pessoa.cpf + ") ");
  if (cpf == "") {
    cpf = pessoa.cpf;
  }

  let dataNascimento: string = prompt(
    "Digite o dataNascimento da pessoa (" + pessoa.dataNascimento + ") "
  );
  if (dataNascimento == "") {
    dataNascimento = pessoa.dataNascimento;
  }

  let logradouro: string = prompt(
    "Digite o seu logradouro (" + (endereco.logradouro ?? "") + ") "
  );
  if (logradouro == "") {
    logradouro = endereco.logradouro;
  }

  let numero: number = parseInt(
    prompt("Digite o seu numero (" + endereco.numero + ") ")
  );
  if (numero <= 0 || isNaN(numero)) {
    numero = endereco.numero;
  }

  let complemento: string = prompt(
    "Digite o complemento (" + endereco.complemento + ") "
  );
  if (complemento == "") {
    complemento = endereco.complemento ?? "";
  }

  let bairro: string = prompt("Digite o seu bairro (" + endereco.bairro + ") ");
  if (bairro == "") {
    bairro = endereco.bairro;
  }

  let cep: number = parseInt(
    prompt("Digite o seu cep (" + endereco.cep + ") ")
  );
  if (isNaN(cep) || cep <= 0) {
    cep = endereco.cep;
  }

  let cidade: string = prompt("Digite o seu cidade (" + endereco.cidade + ") ");
  if (cidade == "") {
    cidade = endereco.cidade;
  }

  let estado: string = prompt("Digite o seu estado (" + endereco.estado + ") ");
  if (estado == "") {
    estado = endereco.estado;
  }

  let pais: string = prompt("Digite o seu pais (" + endereco.pais + ") ");
  if (pais == "") {
    pais = endereco.pais;
  }

  let telefone = prompt("Digite o numero de telefone (" + fone + ") ");
  if (telefone == "") {
    telefone = fone;
  }

  pessoa.addEndereco(endereco);
  pessoa.addTelefone(telefone);
  pessoas[askedPersonIndex] = pessoa;
}

function deletePerson() {
  console.clear();
  let index = askPersonIndex();
  delete pessoas[index];
  console.log("Pessoa #" + index + " excluida com sucesso");
}

function run() {
  let option: number = -1;

  while (option != 0) {
    console.clear();
    console.log("Selecione a opção desejada");
    console.log("1 - Adicionar pessoa");
    console.log("2 - Adicionar endereco");
    console.log("3 - Adicionar telefone");
    console.log("4 - Listar todas as pessoas");
    console.log("5 - Visualizar uma unica pessoa");
    console.log("6 - Editar pessoa");
    console.log("7 - Excluir pessoa");
    console.log("0 - Sair ");

    let answer: string = prompt("");
    if (answer == "") {
      option = -1;
    } else {
      option = Number(answer);
    }

    switch (option) {
      case 1:
        addPerson();

        pressEnter();
        break;

      case 2:
        addEndereco();

        pressEnter();
        break;

      case 3:
        addNumeroTelefone();

        pressEnter();
        break;

      case 4:
        listEverythingOfPeople();

        pressEnter();
        break;
      case 5:
        showPerson();

        pressEnter();
        break;

      case 6:
        editPeson();

        pressEnter();
        break;

      case 7:
        deletePerson();

        pressEnter();
        break;

      case 0:
        console.log("Desligando sistema");
        break;
    }
  }
}

run();
