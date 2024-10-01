//EXERCICIO
//fazer model de usario
//fazer as rotas crud usuario
//fazer consulta no banco para login
//crud de usuario no front
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { Pessoa } from "./model/Pessoa";
import { Viagem } from "./model/Viagem";

const port: Number = 3000;
let server: Express = express();

server.use(cors());
server.use(express.json());

server.use((req: Request, res: Response, next: NextFunction) => {
  // console.log("[" + new Date() + "] " + req.method + " " + req.url);
  let authorization = req.get("Authorization")?.replace("Basic", "");

  // console.log(authorization);

  let user = "";
  let password = "";
  if (authorization) {
    let decoded = Buffer.from(authorization, "base64").toString("binary");
    let userPassword = decoded.split(":");
    user = userPassword[0];
    password = userPassword[1];
  }

  //todo fazer consulta no banco
  //login com sucesso
  if (user == "bonfa" && password == "123456") {
    next();
    return;
  }

  let erro = { id: null, erro: "Falha na autenticação" };

  return res.status(401).json(erro);
});

server.get("/login", async (req: Request, res: Response): Promise<Response> => {
  let resultado = { id: null, resultado: "Login okay" };

  return res.status(200).json(resultado);
});

server.get(
  "/pessoa",
  async (req: Request, res: Response): Promise<Response> => {
    let pessoas = await Pessoa.listAll();

    return res.status(200).json(pessoas);
  }
);

server.get(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let pessoa = await Pessoa.findOneById(id);

    if (pessoa != null) {
      return res.status(200).json(pessoa);
    }

    let erro = { id: id, erro: "Pessoa não encontrada." };

    return res.status(400).json(erro);
  }
);

//gravar pessoa
server.post(
  "/pessoa",
  async (req: Request, res: Response): Promise<Response> => {
    let pessoa = new Pessoa();
    pessoa.nome = req.body.nome;
    pessoa.cpf = req.body.cpf.replace(/\D/g, "");
    pessoa.idade = req.body.idade;
    pessoa.cidade = req.body.cidade;
    pessoa.siglauf = req.body.siglauf;

    let erros: string[] = pessoa.validate();

    if (erros.length > 0) {
      let json = { erros: erros };
      return res.status(400).json(json);
    }

    await pessoa.insert();

    if (pessoa.id) {
      return res.status(200).json(pessoa);
    }

    let erro = { id: null, erro: "Erro ao inserir pessoa." };

    return res.status(400).json(erro);
  }
);

//editar pessoa
server.put(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let pessoa = await Pessoa.findOneById(id);

    if (pessoa == null) {
      let erro = { id: id, erro: "Pessoa não encontrada." };
      return res.status(400).json(erro);
    }

    pessoa.nome = req.body.nome;
    pessoa.cpf = req.body.cpf.replace(/\D/g, "");
    pessoa.idade = req.body.idade;
    pessoa.cidade = req.body.cidade;
    pessoa.siglauf = req.body.siglauf;
    console.log(pessoa);

    let erros: string[] = pessoa.validate();

    if (erros.length > 0) {
      let json = { erros: erros };
      return res.status(400).json(json);
    }

    pessoa.update();

    if (pessoa.id) {
      return res.status(200).json(pessoa);
    }

    let erro = { id: id, erro: "Erro ao editar pessoa." };
    return res.status(400).json(erro);
  }
);

server.delete(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let pessoa = await Pessoa.findOneById(id);

    await pessoa?.delete();

    let retorno = { okay: true };
    return res.status(200).json(pessoa);
  }
);

// NOTE Listar viagens de acordo com a pessoa
server.get(
  "/pessoa/:id/viagem",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let viagem = new Viagem();
    let viagens = await viagem.obterViagensPessoa(id);

    return res.status(200).json(viagens);
  }
);

server.post(
  "/pessoa/:id/adicionarviagem",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let pessoa = await Pessoa.findOneById(id);

    if (pessoa == null) {
      let erro = { id: id, erro: "Pessoa não encontrada." };

      return res.status(400).json(erro);
    }

    let viagem = new Viagem();
    viagem.idpessoa = id;
    viagem.destino = req.body.destino;
    viagem.datahorapartida = new Date(req.body.datahorapartida);
    viagem.datahorachegada = new Date(req.body.datahorachegada);

    await viagem.insert();

    if (viagem.id) {
      pessoa.viagens.push(viagem);
      return res.status(200).json(pessoa);
    }

    let erro = { id: id, erro: "Erro ao inserir viagem." };
    return res.status(400).json(erro);
  }
);

server.delete(
  "/pessoa/:id/removerviagem/:idViagem",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let idViagem = Number(req.params.idViagem);
    let pessoa = await Pessoa.findOneById(id);

    if (pessoa == null) {
      let erro = {
        id: id,
        posicao: idViagem,
        erro: "Pessoa não encontrada.",
      };

      return res.status(400).json(erro);
    }

    let viagem = new Viagem();
    let viagemEspecifica = await viagem.findOneById(idViagem);

    if (viagemEspecifica == null) {
      let erro = {
        id: id,
        posicao: idViagem,
        erro: "Viagem não encontrada.",
      };

      return res.status(400).json(erro);
    }

    viagem.id = idViagem;
    let result = await viagem.delete();
    if (result) {
      let retorno = { okay: true };
      return res.status(200).json(retorno);
    }
    let erro = {
      erro: "Erro ao deletar a viagem!",
    };
    return res.status(400).json(erro);
  }
);

server.get(
  "/viagem/",
  async (req: Request, res: Response): Promise<Response> => {
    let viagem = new Viagem();
    let viagens = await viagem.findAll();

    return res.status(200).json(viagens);
  }
);

server.get(
  "/viagem/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let viagem = new Viagem();
    let viagemEspecifica = await viagem.findOneById(id);

    if (viagem == null) {
      let erro = { id: id, erro: "Viagem não encontrada." };

      return res.status(400).json(erro);
    }

    return viagemEspecifica;
  }
);

server.get(
  "/viagem/destino/:destino",
  async (req: Request, res: Response): Promise<Response> => {
    let viagens = await Viagem.BuscarPorDestino(req.params.destino);
    return res.status(200).json(viagens);
  }
);

server.listen(port, () => {
  console.log("Server iniciado na porta " + port);
});
