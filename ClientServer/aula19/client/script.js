const apiUrl = "http://localhost:3000";
let authorization = localStorage.getItem("Authorization");

async function verificaLogin() {
  let resultado = await buscarLogin(user, password);

  if (!resultado) {
    window.location = "login.html";
  }
}

async function buscarLogin(authorization) {
  const myHeaders = new Headers();
  console.log(authorization);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", authorization);

  const options = {
    method: "GET",
    headers: myHeaders,
  };

  let result = await fetch(apiUrl + "/login", options);
  let json = await result.json();
  console.log(json);

  if (result.ok) {
    return true;
  }

  return false;
}

function logout() {
  localStorage.removeItem("Authorization");

  window.location = "login.html";
}

async function login() {
  let user = document.getElementById("user").value;
  let password = document.getElementById("password").value;

  let authorization = btoa(user + ":" + password);
  let result = await buscarLogin(authorization);
  console.log(result);

  if (result) {
    localStorage.setItem("Authorization", authorization);
    alert("Login ok");
    window.location = "index.html";
  } else {
    alert("Falha no login!");
  }
}

async function listarViagens(id) {
  console.log(authorization);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authorization);

  const requestOptions = {
    headers: myHeaders,
    method: "GET",
    redirect: "follow",
  };

  console.log(id);

  let result = await fetch(apiUrl + `/pessoa/${id}/viagem`, requestOptions);
  let json = await result.json();

  return json;
}

// NOTE listar pessoa
async function listarPessoas() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authorization);

  const requestOptions = {
    headers: myHeaders,
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
    let viagens = await listarViagens(pessoa.id);

    console.log(viagens);

    let pessoaExcluir = `<button onclick="excluirPessoa(${pessoa.id})" class="btn btn-danger">Excluir</button>`;
    let pessoaEditar = `<button onclick="editarPessoa(${pessoa.id})" class="btn btn-warning">Editar</button>`;
    let viagemAddLink = `<button onclick="addViagem(${pessoa.id})" class="btn btn-success">Adicionar viagem</button>`;

    for (let index = 0; index < viagens.length; index++) {
      viagem = viagens[index];
      if (viagem.idpessoa === pessoa.id) {
        const dataHoraPartidaString = viagem.datahorapartida;
        const dataHoraPartidaObj = new Date(dataHoraPartidaString);
        const dataHoraChegadaString = viagem.datahorachegada;
        const dataHoraChegadaObj = new Date(dataHoraChegadaString);

        const options = {
          hour: "2-digit",
          minute: "2-digit",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };
        const dataFormatadaPartida = dataHoraPartidaObj
          .toLocaleString("pt-BR", options)
          .replace(",", "");
        const dataFormatadaChegada = dataHoraChegadaObj
          .toLocaleString("pt-BR", options)
          .replace(",", "");

        let viagemExcluir = `<button onclick="removerViagem(${viagem.idpessoa}, ${viagem.id})" class="btn btn-danger">Excluir</button>`;

        viagensHtml += `
          <details>
            <summary>Viagem número: ${viagem.id}</summary>
            <b>Partida:</b> ${dataFormatadaPartida} <br />
            <b>Chegada:</b> ${dataFormatadaChegada} <br />
            <b>Destino:</b> ${viagem.destino} <br />
            ${viagemExcluir}
          </details>
        `;
      }
    }

    html += `
        <tr>
            <td>${pessoaEditar} ${pessoaExcluir} ${viagemAddLink} </td>
            <td>${pessoa.id}</td>
            <td>${pessoa.nome}</td>
            <td>${pessoa.cpf}</td>
            <td>${pessoa.idade}</td>
            <td>${pessoa.cidade}</td>
            <td>${pessoa.siglauf}</td>
            <td>${viagensHtml}</td>
        </tr>`;

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
  myHeaders.append("Authorization", authorization);

  let pessoa = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    idade: document.getElementById("idade").value,
    siglauf: document.getElementById("siglauf").value,
    cidade: document.getElementById("cidade").value,
  };

  if (
    pessoa.nome != "" &&
    pessoa.cpf != "" &&
    pessoa.siglauf != "" &&
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
    let pessoaResult = await result.json();

    if (result.status == 200) {
      alert("Pessoa registrada com sucesso!");
      window.location = "/client/index.html";
    } else if (pessoaResult.erros.length > 0) {
      alert(pessoaResult.erros);
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
    const myHeaders = new Headers();
    myHeaders.append("user", user);
    myHeaders.append("password", password);

    const options = {
      method: "DELETE",
      redirect: "follow",
      headers: myHeaders,
    };

    let result = await fetch(`${apiUrl}/pessoa/${id}`, options);

    if (result.ok) {
      alert("Pessoa excluída com sucesso");
    } else {
      alert("Problemas ao excluir a pessoa!");
    }

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

    const myHeaders = new Headers();
    myHeaders.append("user", user);
    myHeaders.append("password", password);

    const options = {
      method: "GET",
      headers: myHeaders,
    };

    let result = await fetch(apiUrl + "/pessoa/" + id, options);
    let pessoa = await result.json();

    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("cpf").value = pessoa.cpf;
    document.getElementById("idade").value = pessoa.idade;
    document.getElementById("siglauf").value = pessoa.siglauf.toUpperCase();

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

  document.getElementById("siglauf").innerHTML += html;
}

// NOTE carregar cidades
async function carregarCidades() {
  let siglaUF = document.getElementById("siglauf").value.toUpperCase();

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

function addViagem(id) {
  window.location = "/client" + "/adicionarviagem.html?id=" + id;
}

async function gravarViagem() {
  let id = pegarParametro("id");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", authorization);

  const raw = {
    destino: document.getElementById("destino").value,
    datahorapartida: document.getElementById("horaPartida").value,
    datahorachegada: document.getElementById("horaChegada").value,
  };

  const options = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };

  let result = await fetch(
    apiUrl + "/pessoa/" + id + "/adicionarviagem",
    options
  );

  if (result.ok) {
    alert("Viagem adicionada com sucesso!");
    window.location = "index.html";
  } else {
    alert("Deu problema filhote!");
  }
}

async function removerViagem(idpessoa, id) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authorization);

  const options = {
    method: "DELETE",
    redirect: "follow",
    headers: myHeaders,
  };

  let result = await fetch(
    apiUrl + "/pessoa/" + idpessoa + "/removerviagem/" + id,
    options
  );

  if (result.ok) {
    alert("Viagem removida com sucesso!");
    listarPessoas();
  } else {
    alert("Deu problema filhote!");
  }
}
