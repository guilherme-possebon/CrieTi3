import { dbQuery } from "../database";

export class Livro {
  id: number = 0;
  titulo: string = "";
  autor: string = "";
  qtpaginas: number = 0;
  emprestado: boolean = false;

  validate(): string[] {
    let erros: string[] = [];

    if (this.titulo.length > 0) {
      erros.push("Titulo é obrigatório");
    }
    if (this.autor.length > 0) {
      erros.push("Autor é obrigatório");
    }
    if (this.qtpaginas > 0) {
      erros.push("Quantidades de paginas é obrigatória");
    }

    return erros;
  }

  async insert(): Promise<Livro | null> {
    let sql =
      "insert into livros (titulo, autor, qtpaginas, emprestado) values ($1, $2, $3, $4) RETURNING id";

    let params = [this.titulo, this.autor, this.qtpaginas, this.emprestado];

    if (this.titulo.length > 0 && this.autor.length > 0 && this.qtpaginas > 0) {
      let result = await dbQuery(sql, params);
      if (result.rows.length > 0) {
        this.id = result.rows[0].id;
        return this;
      }
    }

    return null;
  }

  public async update(): Promise<Livro | null> {
    let sql = `UPDATE livros
               SET
                   titulo = $1,
                   autor = $2,
                   qtpaginas = $3,
                   emprestado = $4
               WHERE
                   id = $5;
               `;

    let params = [
      this.titulo,
      this.autor,
      this.qtpaginas,
      this.emprestado,
      this.id,
    ];

    if (this.id > 0 && this.titulo.length > 0) {
      let result = await dbQuery(sql, params);

      if (result) {
        return this;
      }
    }

    return null;
  }
  public async save(): Promise<Livro | null> {
    if (this.id) {
      return await this.update();
    }

    return await this.insert();
  }

  public async delete(): Promise<Livro | object> {
    let sql = "delete from livros where id = $1";
    let result = await dbQuery(sql, [this.id]);

    let notification = {
      success: {
        message: "Livro deletado com sucesso!",
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

  public async findOneById(): Promise<Livro | null> {
    let sql = `SELECT
                   l.id AS livro_id,
                   l.titulo AS titulo,
                   l.autor AS autor,
                   l.qtpaginas AS qtpaginas,
                   l.emprestado AS emprestado,
                   c.id AS categoria_id,
                   c.name AS categoria_name
               FROM
                   livros l
               LEFT JOIN
                   livros_has_categorias lhc ON l.id = lhc.livros_id
               LEFT JOIN
                   categorias c ON lhc.categorias_id = c.id
               WHERE
                   l.id = $1;`;
    let result = await dbQuery(sql, [this.id]);

    if (result.rows.length > 0) {
      return Object.assign(result.rows[0]);
    }

    return null;
  }

  public async findAll(): Promise<Livro[]> {
    let sql = `SELECT
                   l.id AS livro_id,
                   l.titulo,
                   l.autor,
                   l.qtpaginas,
                   l.emprestado,
                   STRING_AGG(c.id::text, ', ') AS categoria_id,
                   STRING_AGG(c.name, ', ') AS categoria_name
               FROM
                   livros l
               LEFT JOIN
                   livros_has_categorias lc ON l.id = lc.livros_id
               LEFT JOIN
                   categorias c ON lc.categorias_id = c.id
               GROUP BY
                   l.id, l.titulo, l.autor, l.qtpaginas, l.emprestado
               ORDER BY
                   l.id;
`;

    let result = await dbQuery(sql);

    return result.rows;
  }
}
