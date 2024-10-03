import { dbQuery } from "../database";

export class LivrosHasCategorias {
  id: number = 0;
  livros_id: number = 0;
  categorias_id: number = 0;
  newCategorias_id: number = 0;

  public async insert(): Promise<LivrosHasCategorias | null> {
    let sql = `INSERT INTO livros_has_categorias (livros_id, categorias_id) VALUES ($1, $2) RETURNING id;`;
    let params = [this.livros_id, this.categorias_id];

    if (this.livros_id > 0 && this.categorias_id > 0) {
      let result = await dbQuery(sql, params);

      console.log(result, "Modal");

      if (result.rows.length > 0) {
        this.livros_id = result.rows[0].livros_id;
        this.categorias_id = result.rows[0].categorias_id;
        return this;
      }
    }
    return null;
  }

  public async update(): Promise<LivrosHasCategorias | null> {
    let sql = `UPDATE livros_has_categorias SET livros_id = $1, categorias_id = $2 WHERE livros_id = $3 AND categorias_id = $4; `;

    let params = [
      this.livros_id,
      this.newCategorias_id,
      this.livros_id,
      this.categorias_id,
    ];

    if (
      this.livros_id > 0 &&
      this.categorias_id > 0 &&
      this.newCategorias_id > 0
    ) {
      let result = await dbQuery(sql, params);

      if (result.rows.length > 0) {
        return this;
      }
    }

    return null;
  }

  public async save(): Promise<LivrosHasCategorias | null> {
    if (this.newCategorias_id) {
      return await this.update();
    }

    return await this.insert();
  }

  public async delete(): Promise<LivrosHasCategorias | object> {
    let sql =
      "DELETE FROM livros_has_categorias WHERE livros_id = $1 AND categorias_id = $2; ";
    let result = await dbQuery(sql, [this.livros_id, this.categorias_id]);

    let notification = {
      success: {
        message: "Livro desvinculado com sucesso!",
      },
      error: {
        typeError: "NotFind",
        message: "Erro ao deletar livro!",
      },
    };
    if (result.rowCount == 1) {
      return notification.success;
    }

    return notification.error;
  }
}
