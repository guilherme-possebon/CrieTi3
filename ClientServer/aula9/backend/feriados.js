let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let html = `
      <option value="${currentYear - 3}">${currentYear - 3}</option>
      <option value="${currentYear - 2}">${currentYear - 2}</option>
      <option value="${currentYear - 1}">${currentYear - 1}</option>
      <option value="${currentYear}">${currentYear}</option>
      <option value="${currentYear + 1}">${currentYear + 1}</option>
      <option value="${currentYear + 2}">${currentYear + 2}</option>
      <option value="${currentYear + 3}">${currentYear + 3}</option>
  `;

document.getElementById("anos").innerHTML = html;

async function buscaFeriados() {
  let ano = document.getElementById("anos").value;
  let url = `https://brasilapi.com.br/api/feriados/v1/${ano}`;

  console.log(currentYear);

  let res = await fetch(url);
  let feriados = await res.json();
  let html = "";

  for (let index = 0; index < feriados.length; index++) {
    const feriado = feriados[index];
    html += `
        <tr>
            <td>${feriado.date}</td>
            <td>${feriado.name}</td>
            <td>${feriado.type}</td>
        </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = html;
}
