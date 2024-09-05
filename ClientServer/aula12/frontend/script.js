const apiUrl = "http://localhost:3000";

// NOTE listar pessoa
async function listarPessoas() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let result = await fetch(apiUrl + "/pessoa", requestOptions);
  let pessoas = await result.json();
  let html = "";

  for (let index = 0; index < pessoas.length; index++) {
    let pessoa = pessoas[index];

    let viagem = "";

    let viagensHtml = "";

    if (pessoa !== null && viagem !== null) {
      let viagens = pessoa.viagens;
      let pessoaExcluir = `<button onclick="excluirPessoa(${pessoa.id})" class="btn btn-danger">Excluir</button>`;
      let pessoaEditar = `<button onclick="editarPessoa(${pessoa.id})" class="btn btn-warning">Editar</button>`;
      let viagemAddLink = `<button onclick="adicionarViagemLink(${pessoa.id})" class="btn btn-success">Adicionar viagem</button>`;

      for (let index = 0; index < viagens.length; index++) {
        viagem = viagens[index];
        let viagemExcluir = `<button onclick="excluirViagem(${viagem.id})" class="btn btn-danger">Excluir</button>`;
        let viagemEditar = `<button onclick="editarViagem(${viagem.id})" class="btn btn-warning">Editar</button>`;

        viagensHtml += `
          <details>
            <summary>Viagem número: ${index}</summary>
            <b>Partida:</b> ${viagem.dataHoraPartida} <br />
            <b>Chegada:</b> ${viagem.dataHoraChegada} <br />
            <b>Destino:</b> ${viagem.destino} <br />
            ${viagemExcluir}
            ${viagemEditar}
          </details>
        `;
      }

      html += `
        <tr>
            <td>${pessoaEditar} ${pessoaExcluir} ${viagemAddLink} </td>
            <td>${pessoa.id}</td>
            <td>${pessoa.nome}</td>
            <td>${pessoa.cpf}</td>
            <td>${pessoa.idade}</td>
            <td>${pessoa.cidade}</td>
            <td>${pessoa.siglaUf}</td>
            <td>${viagensHtml}</td>
        </tr>`;
    }

    document.getElementById("tbody-pessoas").innerHTML = html;
  }
}

// NOTE gravar pessoa
async function gravarPessoa() {
  let id = pegarParametro("id");
  let method = id == null ? "POST" : "PUT";
  let url = id == null ? "/pessoa" : "/pessoa/" + id;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let pessoa = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    idade: document.getElementById("idade").value,
    siglaUf: document.getElementById("siglaUf").value,
    cidade: document.getElementById("cidade").value,
  };

  if (
    pessoa.nome != "" &&
    pessoa.cpf != "" &&
    pessoa.siglaUf != "" &&
    pessoa.cidade != ""
  ) {
    const raw = JSON.stringify(pessoa);

    const options = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let result = await fetch(apiUrl + url, options);
    console.log(result, "result");
    let pessoaResult = await result.json();

    if (result.status == 200) {
      alert("Pessoa registrada com sucesso!");
      window.location = "/frontend/index.html";
    }
  } else {
    alert("Preencha todos os campos requisitados");
  }
}

// NOTE editar pessoa
async function editarPessoa(id) {
  window.location = "adicionarpessoa.html?id=" + id;
}

// NOTE excluir pessoa
async function excluirPessoa(id) {
  if (confirm("Deseja realmente excluir essa pessoa: " + id)) {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    let result = await fetch(`${apiUrl}/pessoa/${id}`, requestOptions);

    // Check if the response contains JSON
    if (result.ok && result.headers.get("content-length") !== "0") {
      let pessoaResult = await result.json();

      console.log(pessoaResult);

      if (pessoaResult.nome) {
        alert("Pessoa excluída com sucesso");
      } else {
        alert("Problemas ao excluir a pessoa!");
      }
    } else {
      alert("Pessoa excluída com sucesso!!!!!!!");
    }

    // Refresh the list after deletion
    listarPessoas();
  }
}

// NOTE pegar paramentro
function pegarParametro(paramentro) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramentro);
}
// NOTE carregar pessoa
async function carregarPessoa() {
  let id = pegarParametro("id");
  await carregarEstados();

  if (id != null) {
    document.getElementById("h1").innerHTML = "Editar pessoa";

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let result = await fetch(apiUrl + "/pessoa/" + id, requestOptions);
    let pessoa = await result.json();

    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("cpf").value = pessoa.cpf;
    document.getElementById("idade").value = pessoa.idade;
    document.getElementById("siglaUf").value = pessoa.siglaUftoUpperCase();

    await carregarCidades();
    document.getElementById("cidade").value = pessoa.cidade.toUpperCase();
  }
}

// NOTE carregar estados
async function carregarEstados() {
  let resultEstados = await fetch("https://brasilapi.com.br/api/ibge/uf/v1");
  let estados = await resultEstados.json();
  let html = "";

  for (let index = 0; index < estados.length; index++) {
    const estado = estados[index];

    html += `
        <option value="${estado.sigla}">${estado.sigla} - ${estado.nome}</option>
    `;
  }

  document.getElementById("siglaUf").innerHTML += html;
}

// NOTE carregar cidades
async function carregarCidades() {
  let siglaUF = document.getElementById("siglaUf").value.toUpperCase();
  console.log(siglaUF, "aa");

  if (siglaUF !== "") {
    let resultCidades = await fetch(
      `https://brasilapi.com.br/api/ibge/municipios/v1/${siglaUF}?providers=dados-abertos-br,gov,wikipedia`
    );
    let cidades = await resultCidades.json();
    let html = "";

    if (cidades.type != "not_found") {
      for (let index = 0; index < cidades.length; index++) {
        const cidade = cidades[index];

        html += `
        <option value="${cidade.nome}">${cidade.nome}</option>
        `;
      }
    }
    document.getElementById("cidade").innerHTML = html;
    return cidades;
  }
}

async function adicionarViagemLink(id) {
  let url = id == null ? "/pessoa" : "/pessoa" + id;

  window.location = "/frontend" + "/adicionarviagem.html?id=" + id;
}

async function gravarViagem() {
  let id = pegarParametro("id");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    destino: document.getElementById("destino").value,
    dataHoraPartida: document.getElementById("horaPartida").value,
    dataHoraChegada: document.getElementById("horaChegada").value,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch(
    apiUrl + "/pessoa/" + id + "/adicionarviagem",
    requestOptions
  );

  console.log(result);
  if (result.status == 200) {
    alert("Viagem registrada com sucesso!");
    window.location = "/frontend/index.html";
  } else {
    alert("Preencha todos os campos requisitados");
  }
}

async function adicionarViagem(id) {}

async function editarViagem(id) {}

async function excluirViagem(id) {
  if (confirm("Deseja realmente excluir essa pessoa: " + id)) {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    let result = await fetch(
      `${apiUrl}/pessoa/${id}/removerviagem/1`,
      requestOptions
    );

    // Check if the response contains JSON
    if (result.ok && result.headers.get("content-length") !== "0") {
      let pessoaResult = await result.json();

      console.log(pessoaResult);

      if (pessoaResult.nome) {
        alert("Pessoa excluída com sucesso");
      } else {
        alert("Problemas ao excluir a pessoa!");
      }
    } else {
      alert("Pessoa excluída com sucesso!!!!!!!");
    }

    // Refresh the list after deletion
    listarPessoas();
  }
}
