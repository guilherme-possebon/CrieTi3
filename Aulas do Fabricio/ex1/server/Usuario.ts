import { dbQuery } from "./database";

export class Usuario {
  id: number = 0;
  username: string = "";
  password: string = "";
  type_error?: string = "";
  message?: string = "";

  validate(): string[] {
    let erros: string[] = [];

    if (this.username.length > 0) {
      erros.push("Nome de usuário é obrigatório");
    }
    if (this.password.length > 0) {
      erros.push("Senha é obrigatória");
    }

    return erros;
  }

  public async findUser(): Promise<Usuario | object | boolean> {
    let sql =
      "select * from users WHERE username = $1 AND password = crypt($2, password)";

    let notification: object[] = [
      {
        message: "Usuário está correto!",
      },
      {
        type_error: "UserNotFinded",
        message: "Nome de usuário ou senha estão invalidos!",
      },
      {
        type_error: "EmptyFields",
        message: "Verifique se tem algum campo vazio!",
      },
    ];

    if (this.username.length > 0 && this.password.length > 0) {
      let params: string[] = [this.username, this.password];
      let result = await dbQuery(sql, params);

      if (result[0]?.id > 0) {
        return notification[0], true;
      }
      return notification[1];
    }

    return notification[2];
  }
}
