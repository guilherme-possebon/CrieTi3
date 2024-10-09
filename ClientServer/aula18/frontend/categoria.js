async function gravarCategoria() {
  let id = pegarParamentro("id");

  let method = id == null ? "POST" : "PUT";
  let url = id == null ? "/categoria" : "/categoria/" + id;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let categoria = {
    name: document.getElementById("categoria").value,
  };

  const raw = JSON.stringify(categoria);

  const options = {
    method: method,
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch(apiUrl + url, options);

  if (result.ok) {
    alert("Categoria cadastrada com sucesso!");
    window.location = "index.html";
  } else {
    alert("Erro ao cadastrar a categoria!");
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
      alert("Categoria excluido com sucesso");
    } else {
      alert("Problemas em excluir o livro!");
    }
  }

  listarLivros();
}

async function carregarCategoria() {
  let id = pegarParamentro("id");

  if (id != null) {
    document.getElementById("h1").innerHTML = "Editar categoria";
    document.getElementById("name").hidden = true;
    let html = `
    <label for="categoria">Nome</label>
    <select name="categoria" id="categoria" class="categoriaSelect"></select>
    `;
    document.getElementById("inputsContainer").innerHTML = html;

    document.getElementById("saveButton").innerText = "Salvar categoria";
    carregarCategoriasDosLivros();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let result = await fetch(apiUrl + "/categoria/" + id, requestOptions);
    let categoria = await result.json();

    document.getElementById("categoria").value = categoria.name;
  }
}

async function carregarCategoriasDosLivros() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let html = "";

  let result = await fetch(apiUrl + "/categoria", requestOptions);
  let json = await result.json();

  json.forEach((categoria) => {
    html += `
        <option value="${categoria.id}">${categoria.name}</option>
    `;
  });

  document.getElementById("categoria").innerHTML = html;
}

async function gravarCategoriaNoLivro(idLivro) {
  let idCategoria = document.getElementById("categoria").value;
  console.log(idLivro);
  console.log(idCategoria);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    livros_id: idLivro,
    categorias_id: idCategoria,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch(apiUrl + "/livrohascategorias", requestOptions);
}
