async function sendEmail(relatorioType) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  console.log(relatorioType);

  let result = await fetch(
    apiUrl + "/relatorio/" + relatorioType,
    requestOptions
  );
  let json = await result.json();

  for (let index = 0; index < json.length; index++) {
    const element = json[index];

    console.log(element);
  }

  alert("");
}
