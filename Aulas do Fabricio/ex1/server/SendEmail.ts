import { dbQuery } from "./database";
import { FormaPagamento } from "./FormaPagamento";
import { UnidadeMedida } from "./UnidadeMedida";
import * as nodemailer from "nodemailer";
import * as fs from "fs";

export class SendEmail {
  result: string = "";

  private static htmlGenerator(array: FormaPagamento[] | UnidadeMedida[]) {
    let html: string = `<!DOCTYPE html>
                          <html lang="en">
                                  <head>
                                  <meta charset="UTF-8">
                                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                  <title>Dynamic Table</title>
                              </head>
                          <body>
                              <table border="1">
                                  <thead>
                                      <tr>
                                          <th>ID</th>
                                          <th>Name</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      `;

    for (let index = 0; index < array.length; index++) {
      const arrayIndex = array[index];

      html += `
          <tr>
              <td>${arrayIndex.id}</td>
              <td>${arrayIndex.name}</td>
          </tr>
      `;
    }

    html += `
            </tbody>
        </table>
    </body>
    </html>
    `;

    return html;
  }

  public async findAllUnidadeMedidaEmail(): Promise<string> {
    let sql = `SELECT * FROM unidade_medida ORDER BY id`;
    let result = await dbQuery(sql);
    let unidaedMedidas: UnidadeMedida[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let unidadeMedida = new UnidadeMedida();
      Object.assign(unidadeMedida, json);
      unidaedMedidas.push(unidadeMedida);
    }
    let htmlResult = SendEmail.htmlGenerator(unidaedMedidas);
    console.log(unidaedMedidas);

    return htmlResult;
  }
  public async findAllFormaPagamento(): Promise<string> {
    let sql = `SELECT * FROM forma_de_pagamento ORDER BY id`;
    let result = await dbQuery(sql);
    let formaPagamentos: FormaPagamento[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let formaPagamento = new FormaPagamento();
      Object.assign(formaPagamento, json);
      formaPagamentos.push(formaPagamento);
    }
    let htmlResult = SendEmail.htmlGenerator(formaPagamentos);

    console.log(formaPagamentos);

    return htmlResult;
  }
}
