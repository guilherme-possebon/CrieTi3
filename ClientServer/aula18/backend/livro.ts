import { dbQuery } from "./database";

export class Livro {
  codigo: number = 0;
  titulo: string = "";
  autor: string = "";
  qtpaginas: number = 0;
  emprestado: boolean = false;
  idcategoria: number = 0;

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
    if (this.idcategoria > 0) {
      erros.push("Obrigatório pelo menos setar uma categoria");
    }

    return erros;
  }

  async insert(): Promise<Livro | null> {
    let sql =
      "insert into livros (titulo, autor, qtpaginas, emprestado, idcategoria) values ($1, $2, $3, $4, $5) RETURNING codigo";
    let params = [
      this.titulo,
      this.autor,
      this.qtpaginas,
      this.emprestado,
      this.idcategoria,
    ];
    console.log("insert");

    console.log(params);

    if (this.titulo.length > 0 && this.autor.length > 0 && this.qtpaginas > 0) {
      let resultado = await dbQuery(sql, params);
      console.log(resultado);
      if (resultado.length > 0) {
        this.codigo = resultado[0].codigo;
        return this;
      }
    }

    return null;
  }

  public async update(): Promise<Livro | null> {
    let sql =
      "update livros set titulo = $2, autor = $3, qtpaginas = $4 where codigo = $1";

    let params = [this.codigo, this.titulo, this.autor, this.qtpaginas];

    if (this.codigo > 0 && this.titulo.length > 0) {
      let resultado = await dbQuery(sql, params);

      if (resultado) {
        return this;
      }
    }

    return null;
  }
  public async save(): Promise<Livro | null> {
    if (this.codigo) {
      return await this.update();
    }

    return await this.insert();
  }

  async delete(): Promise<Livro | boolean> {
    let sql = "delete from livros where codigo = $1";
    let resultado = await dbQuery(sql, [this.codigo]);

    if (resultado.length == 0) {
      return true;
    }

    return false;
  }

  public async findOneById(): Promise<Livro | null> {
    let sql = "select * from livros where codigo = $1";
    let resultado = await dbQuery(sql, [this.codigo]);

    if (resultado.length > 0) {
      return Object.assign(new Livro(), resultado[0]);
    }

    return null;
  }

  public async findAll(): Promise<Livro[]> {
    let sql = "select * from livros order by codigo";
    let result = await dbQuery(sql);
    let livros: Livro[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let livro = new Livro();
      Object.assign(livro, json);
      livros.push(livro);
    }

    return livros;
  }
}
