import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Pessoa } from "./Pessoa";
import { Viagem } from "./Viagem";
import { client, dbQuery } from "./database";

let port = 3000;

let server: Express = express();

server.use(cors());
server.use(express.json());

// NOTE Listar pessoas
server.get(
  "/pessoa",
  async (req: Request, res: Response): Promise<Response> => {
    let pessoas = await Pessoa.listAll();
    return res.status(200).json(pessoas);
  }
);

// NOTE Pegar um pessoa
server.get(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let pessoa = await Pessoa.findOneById(id);

    if (pessoa != null) {
      return res.status(200).json(pessoa);
    }

    let erro = {
      id: id,
      erro: "Id da pessoa não foi encontrada.   ",
    };

    return res.status(400).json(erro);
  }
);

// NOTE Criar pessoa
server.post(
  "/pessoa",
  async (req: Request, res: Response): Promise<Response> => {
    let pessoa: Pessoa = new Pessoa();

    pessoa.nome = req.body.nome;
    pessoa.cpf = req.body.cpf.replace(/\D/g, "");
    pessoa.idade = req.body.idade;
    pessoa.siglauf = req.body.siglauf;
    pessoa.cidade = req.body.cidade;

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

// NOTE Editar uma pessoa
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

// NOTE Deletar uma pessoa
server.delete(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let pessoa = await Pessoa.findOneById(id);

    if (pessoa != null) {
      await pessoa?.delete();

      let retorno = { okay: true };
      return res.status(200).json(retorno);
    }

    let erro = {
      id: id,
      erro: "Id da pessoa não foi encontrada.",
    };

    return res.status(400).json(erro);
  }
);

// NOTE Listar viagens
server.get(
  "/pessoa/:id/viagens",
  async (req: Request, res: Response): Promise<Response> => {
    let viagens = await Viagem.findAll();

    return res.status(200).json(viagens);
  }
);

// NOTE Adicionar uma viagem
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

// NOTE Remover uma viagem
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

    let viagem = await Viagem.findOneById(idViagem);

    if (viagem == null) {
      let erro = {
        id: id,
        posicao: idViagem,
        erro: "Viagem não encontrada.",
      };

      return res.status(400).json(erro);
    }

    console.log("idViagem=" + idViagem);
    await viagem.delete();
    let retorno = { okay: true };
    return res.status(200).json(retorno);
  }
);

// NOTE Listar uma viagem
server.get(
  "/viagem/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let viagem = await Viagem.findOneById(id);

    if (viagem == null) {
      let erro = { id: id, erro: "Viagem não encontrada." };

      return res.status(400).json(erro);
    }

    return viagem;
  }
);

// NOTE Listar viagens de acordo com o destino
server.get(
  "/viagem/destino/:destino",
  async (req: Request, res: Response): Promise<Response> => {
    let viagens = await Viagem.BuscarPorDestino(req.params.destino);
    return res.status(200).json(viagens);
  }
);

const serverInstance = server.listen(port, () => {
  console.log("Server iniciado na porta " + port);
});

const gracefulShutdown = () => {
  console.log("\nServer is closing...");
  serverInstance.close(() => {
    console.log("Server closed successfully");
    client.end();
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
