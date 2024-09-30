const apiUrl = "http://localhost:3000";

async function listarLivros() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let result = await fetch(apiUrl + "/livro", requestOptions);
  let livros = await result.json();
  console.log(livros);
  let html = "";

  for (let i = 0; i < livros.length; i++) {
    let livro = livros[i];
    let emprestado = livro.emprestado == true ? "Sim" : "Não";

    console.log(livro.livro_id, "LIvro");

    console.log(livro.categoria_ids, "Categoria");

    let test = "";

    if (livro.categorias) {
      let ids = livro.categorias?.split(", ");
      ids.forEach((id) => {
        console.log(id, "Teste");
        test += `<li>${id}</li>`;
      });
    }

    let excluir = `<button onclick="excluirLivro(${livro.livro_id})" class="btn btn-danger">Excluir</button>`;
    let editar = `<button onclick="editarLivro(${livro.livro_id})" class="btn btn-warning">Editar</button>`;
    let botao = `<button onclick="devolverLivro(${livro.livro_id})">Devolver</button>`;

    if (livro.emprestado == false) {
      botao = `<button onclick="emprestarLivro(${livro.livro_id})">Emprestar</button>`;
    }

    html += `
        <tr>
            <td>${editar} ${excluir} </td>
            <td>${livro.livro_id}</td>
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.qtpaginas}</td>
            <td>${emprestado} ${botao}</td>
            <td>${test}</td>
        </tr>`;
  }

  document.getElementById("tbody-livros").innerHTML = html;
}

async function gravarLivro() {
  let id = pegarParamentro("id");
  let method = id == null ? "POST" : "PUT";
  let url = id == null ? "/livro" : "/livro/" + id;

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

  if (result.ok) {
    alert("Livro cadastrado com sucesso!");
    window.location = "index.html";
  } else {
    alert("Erro ao cadastrar o livro!");
  }
}

async function excluirLivro(id) {
  if (confirm("Deseja realmente excluir o livro: " + id)) {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    let result = await fetch(`${apiUrl}/livro/${id}`, requestOptions);

    if (result.ok) {
      alert("Livro excluido com sucesso");
    } else {
      alert("Problemas em excluir o livro!");
    }
  }

  listarLivros();
}

async function editarLivro(id) {
  window.location = "adicionarlivro.html?id=" + id;
}

function pegarParamentro(paramentro) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramentro);
}

async function carregarLivro() {
  let id = pegarParamentro("id");

  if (id != null) {
    document.getElementById("h1").innerHTML = "Editar livro";
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let result = await fetch(apiUrl + "/livro/" + id, requestOptions);
    let livro = await result.json();

    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("qtpaginas").value = livro.qtpaginas;
  }
}
async function emprestarLivro(id) {
  if (confirm("Deseja realmente emprestar o livro? " + id)) {
    const options = {
      method: "GET",
      redirect: "follow",
    };

    let result = await fetch(apiUrl + "/livro/" + id + "/emprestar", options);
    let json = await result.json();

    if (result.ok) {
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
    console.log(result);

    if (result.ok) {
      alert("Livro devolvido com sucesso!");
      window.location.reload();
    } else {
      alert("Problemas ao devolver o livro!");
    }
  }
}
