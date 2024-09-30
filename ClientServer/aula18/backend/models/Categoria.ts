import { dbQuery } from "../database";

export class Categoria {
  id: number = 0;
  name: string = "";

  validate(): string[] {
    let erros: string[] = [];

    if (this.name.length === 0) {
      erros.push("Nome é obrigatório");
    }

    return erros;
  }

  async insert(): Promise<Categoria | null> {
    let sql = "insert into categorias (name) values ($1) RETURNING id";
    let params = [this.name];

    if (this.name.length > 0) {
      let result = await dbQuery(sql, params);

      if (result.rows.length > 0) {
        this.id = result.rows[0].id;
        return this;
      }
    }

    return null;
  }

  public async update(): Promise<Categoria | null> {
    let sql = "update categorias set name = $2 where id = $1";

    let params = [this.id, this.name];

    if (this.id > 0 && this.name.length > 0) {
      let result = await dbQuery(sql, params);

      if (result) {
        return this;
      }
    }

    return null;
  }
  public async save(): Promise<Categoria | null> {
    if (this.id) {
      return await this.update();
    }

    return await this.insert();
  }

  async delete(): Promise<Categoria | object> {
    let sql = "delete from categorias where id = $1";
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
      const result = await dbQuery(sql, [this.id]);

      if (result.rowCount && result.rowCount > 0) {
        return notification.success;
      } else {
        return notification.notFind;
      }
    } catch (error) {
      return notification.probablyRelatedToAnotherTable;
    }
  }

  public async findOneById(): Promise<Categoria | null> {
    let sql = "select * from categorias where id = $1";
    let result = await dbQuery(sql, [this.id]);

    if (result.rows.length > 0) {
      return Object.assign(result.rows[0]);
    }

    return null;
  }

  public async findAllOnlyCategories(): Promise<Categoria[]> {
    let sql = "select * from categorias order by id";
    let result = await dbQuery(sql);

    return result.rows;
  }
}
