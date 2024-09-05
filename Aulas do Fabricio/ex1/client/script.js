let apiUrl = "http://localhost:3000";

async function logar() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let result = await fetch(apiUrl + "/usersADM", requestOptions);
  let resultUsers = await result.json();

  let userName = document.getElementById("user").value;
  let password = document.getElementById("password").value;

  if (userName === resultUsers.user && password === resultUsers.password) {
    window.location = "/client/home/";
  } else {
    document.getElementById("password").classList.add("border-danger");
    document.getElementById("user").classList.add("border-danger");
    document.getElementById("confirmationText").innerHTML =
      "Usuário e senha estão incorretos!";
    document.getElementById("confirmationText").classList.add("text-danger");

    setTimeout(() => {
      document.getElementById("password").classList.remove("border-danger");
      document.getElementById("user").classList.remove("border-danger");
      document.getElementById("confirmationText").innerHTML = "";
      document
        .getElementById("confirmationText")
        .classList.remove("text-danger");
    }, 2000);
  }
}
