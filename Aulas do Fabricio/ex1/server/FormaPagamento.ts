import { dbQuery } from "./database";

export class FormaPagamento {
  id: number = 0;
  name: string = "";

  validate(): string[] {
    let erros: string[] = [];

    if (this.name.length > 0) {
      erros.push("Nome é obrigatório");
    }

    return erros;
  }

  async insert(): Promise<FormaPagamento | null> {
    let sql = `INSERT INTO forma_de_pagamento (name) VALUES ($1) RETURNING id`;
    let params = [this.name];

    let resultado = await dbQuery(sql, params);

    if (resultado.length > 0) {
      this.id = resultado[0].id;
      return this;
    }

    return null;
  }

  public async update(): Promise<FormaPagamento | null> {
    let sql = `UPDATE forma_de_pagamento SET name = $2 WHERE id = $1`;

    let params = [this.id, this.name];

    let resultado = await dbQuery(sql, params);

    if (resultado) {
      return this;
    }

    return null;
  }

  public async save(): Promise<FormaPagamento | null> {
    if (this.id) {
      return await this.update();
    }

    return await this.insert();
  }

  public async delete(): Promise<FormaPagamento | boolean> {
    let sql = `DELETE FROM forma_de_pagamento WHERE id = $1;`;
    let resultado = await dbQuery(sql, [this.id]);

    if (resultado.length == 0) {
      return true;
    }

    return false;
  }

  public async findOneById(id: number): Promise<FormaPagamento | null> {
    let sql = "SELECT * FROM forma_de_pagamento WHERE id = $1 LIMIT 1;";
    let resultado = await dbQuery(sql, [id]);

    if (resultado.length > 0) {
      return Object.assign(new FormaPagamento(), resultado[0]);
    }

    return null;
  }

  public async findAll(): Promise<FormaPagamento[]> {
    let sql = `SELECT * FROM forma_de_pagamento ORDER BY id`;
    let result = await dbQuery(sql);
    let formaPagamentos: FormaPagamento[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let formaPagamento = new FormaPagamento();
      Object.assign(formaPagamento, json);
      formaPagamentos.push(formaPagamento);
    }

    return formaPagamentos;
  }
}
