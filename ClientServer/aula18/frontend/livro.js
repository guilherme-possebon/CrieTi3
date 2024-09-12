const apiUrl = "http://localhost:3000";

async function listarLivros() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let result = await fetch(apiUrl + "/livro", requestOptions);
  let livros = await result.json();
  let html = "";

  for (let i = 0; i < livros.length; i++) {
    let livro = livros[i];
    let emprestado = livro.emprestado == true ? "Sim" : "Não";

    let excluir = `<button onclick="excluirLivro(${livro.codigo})" class="btn btn-danger">Excluir</button>`;
    let editar = `<button onclick="editarLivro(${livro.codigo})" class="btn btn-warning">Editar</button>`;
    let botao = `<button onclick="devolverLivro(${livro.id})">Devolver</button>`;

    if (livro.emprestado == false) {
      botao = `<button onclick="emprestarLivro(${livro.id})">Emprestar</button>`;
    }

    html += `
        <tr>
            <td>${editar} ${excluir} </td>
            <td>${livro.codigo}</td>
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.qtpaginas}</td>
            <td>${emprestado} ${botao}</td>
        </tr>`;
  }

  document.getElementById("tbody-livros").innerHTML = html;
}

async function gravarLivro() {
  let codigo = pegarParamentro("codigo");
  let method = codigo == null ? "POST" : "PUT";
  let url = codigo == null ? "/livro" : "/livro/" + codigo;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let livro = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    qtpaginas: document.getElementById("qtpaginas").value,
  };

  const raw = JSON.stringify(livro);

  const options = {
    method: method,
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch(apiUrl + url, options);

  let livroResult = await result.json();

  if (livroResult === "Ok") {
    alert("Livro cadastrado com sucesso!");
    window.location = "index.html";
  } else {
    alert("Erro ao cadastrar o livro!");
  }
}

async function excluirLivro(codigo) {
  if (confirm("Deseja realmente excluir o livro: " + codigo)) {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    let result = await fetch(`${apiUrl}/livro/${codigo}`, requestOptions);
    let json = await result.json();

    if (json.titulo) {
      alert("Livro excluido com sucesso");
    } else {
      alert("Problemas em excluir o livro!");
    }
  }

  listarLivros();
}

async function editarLivro(codigo) {
  window.location = "adicionarlivro.html?codigo=" + codigo;
}

function pegarParamentro(paramentro) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramentro);
}

async function carregarLivro() {
  let codigo = pegarParamentro("codigo");

  if (codigo != null) {
    document.getElementById("h1").innerHTML = "Editar livro";
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let result = await fetch(apiUrl + "/livro/" + codigo, requestOptions);
    let livro = await result.json();

    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("qtpaginas").value = livro.qtpaginas;
  }
}
async function emprestarLivro(id) {
  if (confirm("Deseja realmente emprestar o livro?")) {
    const options = {
      method: "GET",
      redirect: "follow",
    };

    let result = await fetch(apiUrl + "/livro/" + id + "/emprestar", options);
    let json = await result.json();
    console.log(json);

    if (json.emprestado == 1) {
      alert("Livro emprestado com sucesso!");
      window.location.reload();
    } else {
      alert("Problemas ao emprestar o livro!");
    }
  }
}

async function devolverLivro(id) {
  if (confirm("Deseja realmente devolver o livro?")) {
    const options = {
      method: "GET",
      redirect: "follow",
    };

    let result = await fetch(apiUrl + "/livro/" + id + "/devolver", options);
    let json = await result.json();
    console.log(json);

    if (json.emprestado == 1) {
      alert("Livro devolvido com sucesso!");
      window.location.reload();
    } else {
      alert("Problemas ao devolver o livro!");
    }
  }
}
