import { dbQuery } from "../database";

export class Viagem {
  id: number = 0;
  idpessoa: number = 0;
  destino: string = "";
  datahorapartida: Date = new Date();
  datahorachegada: Date = new Date();

  public async insert() {
    let sql = `INSERT INTO "viagens"
        ("idpessoa", "destino", "datahorapartida", "datahorachegada")
        VALUES ($1,$2,$3,$4) RETURNING id`;

    let params = [
      this.idpessoa,
      this.destino,
      this.datahorapartida,
      this.datahorachegada,
    ];

    let resultado = await dbQuery(sql, params);

    if (resultado.length > 0) {
      this.id = resultado[0].id;
      return this;
    }

    return null;
  }

  public async delete() {
    let sql = `DELETE FROM viagens WHERE id = $1;`;
    let resultado = await dbQuery(sql, [this.id]);

    console.log(resultado);

    return true;
  }

  public async findOneById(id: number) {
    let sql = "SELECT * FROM viagens WHERE id = $1 LIMIT 1;";
    let resultado = await dbQuery(sql, [id]);

    if (resultado.length > 0) {
      return Object.assign(new Viagem(), resultado[0]);
    }

    return null;
  }

  public async findAll() {
    let sql = `SELECT * FROM viagens ORDER BY id`;
    let result = await dbQuery(sql);
    let viagens: Viagem[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let viagem = new Viagem();
      Object.assign(viagem, json);
      viagens.push(viagem);
    }

    return viagens;
  }

  static async BuscarPorDestino(destino: string) {
    destino = "%" + destino + "%";

    let sql = `SELECT * FROM viagens WHERE destino ilike $1 ORDER BY id`;
    let result = await dbQuery(sql, [destino]);
    let viagens: Viagem[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let viagem = new Viagem();
      Object.assign(viagem, json);
      viagens.push(viagem);
    }

    return viagens;
  }

  public async obterViagensPessoa(idpessoa: number) {
    let sql = `SELECT * FROM viagens WHERE "idpessoa" = $1;`;
    let result = await dbQuery(sql, [idpessoa]);
    let viagens: Viagem[] = [];

    for (let i = 0; i < result.length; i++) {
      let json = result[i];
      let viagem = new Viagem();
      Object.assign(viagem, json);
      viagens.push(viagem);
    }

    return viagens;
  }
}
