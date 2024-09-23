import { dbQuery } from "./database";

export class UnidadeMedida {
  id: number = 0;
  name: string = "";

  validate(): string[] {
    let erros: string[] = [];

    if (this.name.length > 0) {
      erros.push("Nome é obrigatório");
    }

    return erros;
  }

  async insert(): Promise<UnidadeMedida | null> {
    let sql = `INSERT INTO unidade_medida (name) VALUES ($1) RETURNING id`;

    let params = [this.name];

    if (this.name.length > 0 && this.name.length <= 2) {
      let resultado = await dbQuery(sql, params);

      if (resultado.length > 0) {
        this.id = resultado[0].id;
        return this;
      }
    }

    return null;
  }

  public async update(): Promise<UnidadeMedida | null> {
    let sql = `UPDATE unidade_medida SET name = $2 WHERE id = $1`;

    let params = [this.id, this.name];

    if (this.id > 0 && this.name.length > 0 && this.name.length <= 2) {
      let resultado = await dbQuery(sql, params);

      if (resultado) {
        return this;
      }
    }

    return null;
  }

  public async save(): Promise<UnidadeMedida | null> {
    if (this.id) {
      return await this.update();
    }

    return await this.insert();
  }

  async delete(): Promise<UnidadeMedida | boolean> {
    let sql = `DELETE FROM unidade_medida WHERE id = $1;`;
    let resultado = await dbQuery(sql, [this.id]);

    if (resultado.length == 0) {
      return true;
    }

    return false;
  }

  public async findOneById(id: number): Promise<UnidadeMedida | null> {
    let sql = "SELECT * FROM unidade_medida WHERE id = $1 LIMIT 1;";
    let resultado = await dbQuery(sql, [id]);

    if (resultado.length > 0) {
      return Object.assign(new UnidadeMedida(), resultado[0]);
    }

    return null;
  }

  public async findAll(): Promise<UnidadeMedida[]> {
    let sql = `SELECT * FROM unidade_medida ORDER BY id`;
    let result = await dbQuery(sql);
    let unidadesMedidas: UnidadeMedida[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let unidadeMedida = new UnidadeMedida();
      Object.assign(unidadeMedida, json);
      unidadesMedidas.push(unidadeMedida);
    }

    return unidadesMedidas;
  }
}
