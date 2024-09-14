let apiUrl = "http://localhost:3000";

// NOTE Login
async function login() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch("http://localhost:3000/usersADM", requestOptions);

  console.log(result);

  if (result.ok) {
    window.location = "/client/home.html";
    isLoged(true);
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
function isLoged(status) {
  if (status) {
    localStorage.setItem("auth_token", "authenticated");
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
      console.log(paymentOption, 123123123);
      let editar = `<button onclick="goToEditPage(${paymentOption.id})" class="btn btn-success">Editar</button>`;
      let excluir = `<button onclick="deletePaymentOption(${paymentOption.id})" class="btn btn-danger">Excluir</button>`;
      html += `
        <tr class="table-row-hover">
          <td class="table-body-cell">${paymentOption.id}</td>
          <td class="table-body-cell">${paymentOption.name}</td>
          <td class="table-body-cell">${editar}</td>
          <td class="table-body-cell">${excluir}</td>
        </tr>
      `;
      console.log(paymentOption);
    }
  }
  document.getElementById("tbodyFormasPagamentos").innerHTML = html;
}

// NOTE save paymento option
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
    let saveResult = await result.json();

    if (saveResult) {
      alert("Salvo com sucesso!");
      window.location = "/client/formapagamento.html";
    } else {
      alert("Erro ao salvar a forma de pagamento");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocorreu um erro ao tentar salvar. Tente novamente mais tarde.");
  }
}

// NOTE Go to edit page
function goToEditPage(id) {
  window.location = "/client/adicionarformapagameto.html?id=" + id;
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

    console.log(paymentoResult);
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

    console.log(deleteResult);

    showPaymentOptions();
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
