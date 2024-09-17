let apiUrl = "http://localhost:3000";

// NOTE Login
async function login() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let username = document.getElementById("username").value;

  const raw = JSON.stringify({
    username,
    password: document.getElementById("password").value,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch(apiUrl + "/usersADM", requestOptions);

  if (result.ok) {
    window.location = "/client/home.html";
    isLoged(true, username);
  } else {
    document.getElementById("password").classList.remove("input-colors");
    document.getElementById("username").classList.remove("input-colors");
    document.getElementById("labelPassword").classList.remove("label-colors");
    document.getElementById("labelUser").classList.remove("label-colors");

    document.getElementById("password").classList.add("input-danger");
    document.getElementById("username").classList.add("input-danger");
    document.getElementById("labelPassword").classList.add("label-danger");
    document.getElementById("labelUser").classList.add("label-danger");

    document.getElementById("confirmationText").innerHTML =
      "Usuário e senha estão incorretos!";
    document.getElementById("confirmationText").classList.add("text-danger");
  }
}
// NOTE Is loged
function isLoged(status, username) {
  if (status) {
    localStorage.setItem("auth_token", "authenticated");
    localStorage.setItem("username", username);
  } else {
    localStorage.removeItem("auth_token");
  }
}

// NOTE Check login status
function checkLoginStatus() {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    window.location = "/client/index.html";
  }
}

// NOTE Show username
function showUsername() {
  const username = localStorage.getItem("username");
  document.getElementById("beWelcome").innerHTML =
    "Seja bem vindo, " + username + "!";
}

// NOTE Show payment options
async function showPaymentOptions() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let result = await fetch(apiUrl + "/formaDePagamento", requestOptions);
  let paymentsOptions = await result.json();
  let html = "";

  for (let index = 0; index < paymentsOptions.length; index++) {
    let paymentOption = paymentsOptions[index];
    if (paymentOption !== null) {
      let editar = `<button onclick="goToPaymentEditPage(${paymentOption.id})" class="btn btn-success">Editar</button>`;
      let excluir = `<button onclick="deletePaymentOption(${paymentOption.id})" class="btn btn-danger">Excluir</button>`;
      html += `
        <tr class="table-row-hover">
          <td class="table-body-cell">${paymentOption.id}</td>
          <td class="table-body-cell">${paymentOption.name}</td>
          <td class="table-body-cell flex flex-col items-center gap-4">${editar} ${excluir}</td>

        </tr>
      `;
    }
  }
  document.getElementById("tbodyFormasPagamentos").innerHTML = html;
}

// NOTE Save paymento option
async function savePaymentOption() {
  let id = getParam("id");
  let method = id == null ? "POST" : "PUT";
  let url = id == null ? "/formaDePagamento" : "/formaDePagamento/" + id;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let paymentOption = { name: document.getElementById("name").value };
  const raw = JSON.stringify(paymentOption);

  const requestOptions = {
    method: method,
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let result = await fetch(apiUrl + url, requestOptions);
    let json = await result.json();

    if (result.ok) {
      alert("Salvo com sucesso!");
      window.location = "/client/formapagamento.html";
    } else {
      alert("Erro ao salvar a forma de pagamento, erro: " + json.erro);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocorreu um erro ao tentar salvar. Tente novamente mais tarde.");
  }
}

// NOTE Go to payment edit page
function goToPaymentEditPage(id) {
  window.location = "/client/adicionarformapagameto.html?id=" + id;
}
// NOTE Go to unit edit page
function goToUnitEditPage(id) {
  window.location = "/client/adicionarunidademedida.html?id=" + id;
}

// NOTE Get param
function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// NOTE Load paymento option
async function loadPaymentOption() {
  let id = getParam("id");

  if (id !== null) {
    document.getElementById("h1").innerHTML = "Editar forma de pagamento";
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let result = await fetch(
      apiUrl + "/formaDePagamento/" + id,
      requestOptions
    );
    let paymentoResult = await result.json();

    document.getElementById("name").value = paymentoResult.name;
  }
}

// NOTE Delete payment option
async function deletePaymentOption(id) {
  if (confirm("Deseja realmente deletar a forma de pagamento do id: " + id)) {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    let result = await fetch(
      apiUrl + "/formaDePagamento/" + id,
      requestOptions
    );
    let deleteResult = await result.json();

    showPaymentOptions();
  }
}

// NOTE Show unit of measurement
async function showUnitOfMeasurement() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let result = await fetch(apiUrl + "/unidadeMedida", requestOptions);
  let unitOptions = await result.json();
  let html = "";

  for (let index = 0; index < unitOptions.length; index++) {
    let unitOption = unitOptions[index];
    if (unitOption !== null) {
      let editar = `<button onclick="goToUnitEditPage(${unitOption.id})" class="btn btn-success">Editar</button>`;
      let excluir = `<button onclick="deleteUnit(${unitOption.id})" class="btn btn-danger">Excluir</button>`;
      html += `
        <tr class="table-row-hover">
          <td class="table-body-cell">${unitOption.id}</td>
          <td class="table-body-cell">${unitOption.name}</td>
          <td class="table-body-cell flex flex-col items-center gap-4">${editar} ${excluir}</td>
        </tr>
      `;
    }
  }
  document.getElementById("tbodyUnidadeMedida").innerHTML = html;
}

// NOTE Save unit of measurement
async function saveUnitOfMeasurement() {
  let id = getParam("id");
  let method = id == null ? "POST" : "PUT";
  let url = id == null ? "/unidademedida" : "/unidademedida/" + id;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let unitOption = { name: document.getElementById("name").value };
  const raw = JSON.stringify(unitOption);

  const requestOptions = {
    method: method,
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let result = await fetch(apiUrl + url, requestOptions);
    let json = await result.json();

    if (result.ok) {
      alert("Salvo com sucesso!");
      window.location = "/client/unidademedida.html";
    } else {
      alert("Erro ao salvar a unidade de medida, erro: " + json.erro);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocorreu um erro ao tentar salvar. Tente novamente mais tarde.");
  }
}

// NOTE Load unit of measurement
async function loadUnitOfMeasurement() {
  let id = getParam("id");

  if (id !== null) {
    document.getElementById("h1").innerHTML = "Editar forma de pagamento";
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let result = await fetch(apiUrl + "/unidademedida/" + id, requestOptions);
    let paymentoResult = await result.json();

    document.getElementById("name").value = paymentoResult.name;
  }
}

// NOTE Delete unit of measurement
async function deleteUnit(id) {
  if (confirm("Deseja realmente deletar a unidade de medida do id: " + id)) {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    let result = await fetch(apiUrl + "/unidademedida/" + id, requestOptions);
    let deleteResult = await result.json();

    showUnitOfMeasurement();
  }
}

let toggle = false;
function menuButton() {
  toggle = !toggle;
  if (toggle) {
    document.getElementById("navbar-buttonMenu").classList.add("hidden");
    document.getElementById("navbar-buttonMenu").classList.remove("block");
  } else {
    document.getElementById("navbar-buttonMenu").classList.remove("hidden");
    document.getElementById("navbar-buttonMenu").classList.add("block");
  }
}
