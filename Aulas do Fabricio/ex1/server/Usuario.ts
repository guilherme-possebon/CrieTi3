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

  public async findUser(
    username: string,
    password: string
  ): Promise<Usuario | object> {
    let sql =
      "select * from users WHERE username = $1 AND password = crypt($2, password)";

    let notification = [
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

    if (username.length > 0 && password.length > 0) {
      let result = await dbQuery(sql, [username, password]);

      if (result.length > 0) {
        return notification[0];
      }
      return notification[1];
    }

    return notification[2];
  }
}
