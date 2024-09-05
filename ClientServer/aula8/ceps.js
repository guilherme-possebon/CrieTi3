async function buscaCEP() {
  let inputElement = document.getElementById("CEP").value;
  console.log(inputElement);
  let html = "";
  const url = `https://viacep.com.br/ws/${inputElement}/json/`;

  let res = await fetch(url);
  let cep = await res.json();
  console.log(cep);

  html += `
        <tr>
          <td>CEP</td>
          <td>${cep.cep}</td>
        </tr>
        <tr>
          <td>Logradouro</td>
          <td>${cep.logradouro}</td>
        </tr>
        <tr>
          <td>Complemento</td>
          <td>${cep.complemento}</td>
        </tr>
        <tr>
          <td>Unidade</td>
          <td>${cep.unidade}</td>
        </tr>
        <tr>
          <td>Bairro</td>
          <td>${cep.bairro}</td>
        </tr>
        <tr>
          <td>Localidade</td>
          <td>${cep.localidade}</td>
        </tr>
        <tr>
          <td>UF</td>
          <td>${cep.uf}</td>
        </tr>
        <tr>
          <td>IBGE</td>
          <td>${cep.ibge}</td>
        </tr>
        <tr>
          <td>DDD</td>
          <td>${cep.ddd}</td>
        </tr>
  `;

  document.getElementById("cepTbody").innerHTML = html;
}
