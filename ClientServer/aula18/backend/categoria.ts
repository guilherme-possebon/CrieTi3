import { dbQuery } from "./database";

export class Categoria {
  codigo: number = 0;
  name: string = "";

  validate(): string[] {
    let erros: string[] = [];

    if (this.name.length === 0) {
      erros.push("Nome é obrigatório");
    }

    return erros;
  }

  async insert(): Promise<Categoria | null> {
    let sql = "insert into categorias (name) values ($1) RETURNING codigo";
    let params = [this.name];

    if (this.name.length > 0) {
      let result = await dbQuery(sql, params);

      if (result.length > 0) {
        this.codigo = result[0].codigo;
        return this;
      }
    }

    return null;
  }

  public async update(): Promise<Categoria | null> {
    let sql = "update categorias set name = $2 where codigo = $1";

    let params = [this.codigo, this.name];

    if (this.codigo > 0 && this.name.length > 0) {
      let result = await dbQuery(sql, params);

      if (result) {
        return this;
      }
    }

    return null;
  }
  public async save(): Promise<Categoria | null> {
    if (this.codigo) {
      return await this.update();
    }

    return await this.insert();
  }

  async delete(): Promise<Categoria | object> {
    let sql = "delete from categorias where codigo = $1";
    let notification = {
      probablyRelatedToAnotherTable: {
        typeError: "RelatedToAnotherTable_error",
        message:
          "Erro ao deletar categoria, verifique se essa categoria está relacionada a algum livro!",
      },
      success: {
        message: "Deletado com sucesso!",
      },
      notFind: {
        typeError: "NotFinded_error",
        message: "Categoria não encontrada!",
      },
    };

    try {
      const result = await dbQuery(sql, [this.codigo]);
      if (result.rowCount > 0) {
        // Category was deleted
        return notification.success;
      } else {
        // No rows affected, meaning category was not found
        return notification.notFind;
      }
    } catch (error) {
      // Error handling (related to another table, foreign key constraint, etc.)
      return notification.probablyRelatedToAnotherTable;
    }
  }

  public async findOneById(): Promise<Categoria | null> {
    let sql = "select * from categorias where codigo = $1";
    let result = await dbQuery(sql, [this.codigo]);

    if (result.length > 0) {
      return Object.assign(new Categoria(), result[0]);
    }

    return null;
  }

  public async findAllOnlyCategories(): Promise<Categoria[]> {
    let sql = "select * from categorias order by codigo";
    let result = await dbQuery(sql);
    let categorias: Categoria[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let categoria = new Categoria();
      Object.assign(categoria, json);
      categorias.push(categoria);
    }

    return categorias;
  }

  public async findAllWithBook(): Promise<Categoria[]> {
    let sql =
      "SELECT * FROM livros li LEFT JOIN categorias ct ON li.idcategoria = ct.codigo ORDER BY li.codigo;";
    let result = await dbQuery(sql);
    let categorias: Categoria[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let categoria = new Categoria();
      Object.assign(categoria, json);
      categorias.push(categoria);
    }

    return categorias;
  }
}
