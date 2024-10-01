import { dbQuery } from "../database";
import { Viagem } from "./Viagem";

export class Pessoa {
  id: number = 0;
  nome: string = "";
  cpf: string = "";
  idade: number = 0;
  siglauf: string = "";
  cidade: string = "";
  viagens: Viagem[] = [];

  validate(): string[] {
    let errors: string[] = [];

    if (this.nome.length == 0) {
      errors.push("Nome é obrigatório.");
    }

    if (this.cpf.length == 0) {
      errors.push("Cpf é obrigatório.");
    }

    let cpf: string = this.cpf.replace(/\D/g, "");

    if (this.cpf.length != 11) {
      errors.push("CPF precisa ter 11 caracteres.");
    }

    if (this.idade < 18) {
      errors.push("É necessário ser maior de idade.");
    }

    if (this.siglauf.length == 0) {
      errors.push("É necessário definir sigla.");
    }
    if (this.cidade.length == 0) {
      errors.push("É necessário definir cidade.");
    }

    return errors;
  }

  public async insert(): Promise<Pessoa | null> {
    let sql = `INSERT INTO "pessoas"
    ("nome", "cpf", "idade", "cidade", "siglauf")
    VALUES ($1,$2,$3,$4,$5) RETURNING id`;

    let params = [this.nome, this.cpf, this.idade, this.cidade, this.siglauf];

    let resultado = await dbQuery(sql, params);

    if (resultado.length > 0) {
      this.id = resultado[0].id;
      return this;
    }

    return null;
  }

  public async update(): Promise<Pessoa | null> {
    let sql = `UPDATE pessoas SET nome = $1, cpf = $2, idade = $3,
        cidade = $4, "siglauf" = $5
        WHERE id = $6`;

    let params = [
      this.nome,
      this.cpf,
      this.idade,
      this.cidade,
      this.siglauf,
      this.id,
    ];

    let resultado = await dbQuery(sql, params);

    if (resultado) {
      return this;
    }

    return null;
  }

  public async save(): Promise<Pessoa | null> {
    if (this.id) {
      return await this.update();
    }

    return await this.insert();
  }

  public async delete(): Promise<Pessoa | null> {
    let sql = `DELETE FROM
        pessoas WHERE id = $1
        RETURNING id;`;
    let resultado = await dbQuery(sql, [this.id]);

    if (resultado.length > 0) {
      this.id = resultado[0].id;
      return this;
    }

    return null;
  }

  static async findOneById(id: number): Promise<Pessoa | null> {
    let sql = `SELECT * FROM pessoas
        WHERE id = $1 LIMIT 1;`;
    let resultado = await dbQuery(sql, [id]);

    if (resultado.length > 0) {
      let pessoa = new Pessoa();
      let viagem = new Viagem();

      Object.assign(pessoa, resultado[0]);
      pessoa.viagens = await viagem.obterViagensPessoa(pessoa.id);
      return pessoa;
    }

    return null;
  }

  static async listAll(): Promise<Pessoa[]> {
    let sql = `SELECT * FROM pessoas ORDER BY id`;
    let result = await dbQuery(sql);
    let pessoas: Pessoa[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let pessoa = new Pessoa();
      let viagem = new Viagem();
      Object.assign(pessoa, json);
      pessoas.push(pessoa);
      pessoa.viagens = await viagem.obterViagensPessoa(pessoa.id);
    }

    return pessoas;
  }
}
