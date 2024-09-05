import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Pessoa } from "./Pessoa";
import { Viagem } from "./Viagem";

let server: Express = express();

server.use(cors());
server.use(express.json());

let pessoas: Pessoa[] = [];

// NOTE Listar pessoas
server.get(
  "/pessoa",
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(pessoas);
  }
);

// NOTE Pegar um pessoa
server.get(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id: number = Number(req.params.id);

    if (id >= 0 && id < pessoas.length) {
      return res.status(200).json(pessoas[id]);
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

    pessoa.id = pessoas.length;
    pessoa.nome = req.body.nome;
    pessoa.cpf = req.body.cpf;
    pessoa.idade = req.body.idade;
    pessoa.cidade = req.body.cidade;
    pessoa.siglaUf = req.body.siglaUf;

    pessoas.push(pessoa);

    return res.status(200).json(pessoa);
  }
);

// NOTE Editar uma pessoa
server.put(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id: number = Number(req.params.id);

    if (id >= 0 && id < pessoas.length) {
      let pessoa = pessoas[id];

      pessoa.nome = req.body.nome;
      pessoa.cpf = req.body.cpf;
      pessoa.idade = req.body.idade;
      pessoa.cidade = req.body.cidade;
      pessoa.siglaUf = req.body.siglaUf;

      return res.status(200).json(pessoas[id]);
    }

    let erro = {
      id: id,
      erro: "Id da pessoa não foi encontrada.",
    };

    return res.status(400).json(erro);
  }
);

// NOTE Deletar uma pessoa
server.delete(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id: number = Number(req.params.id);

    if (id >= 0 && id < pessoas.length) {
      delete pessoas[id];

      return res.status(200).json(pessoas[id]);
    }

    let erro = {
      id: id,
      erro: "Id da pessoa não foi encontrada.",
    };

    return res.status(400).json(erro);
  }
);
// NOTE Adicionar uma viagem
server.post(
  "/pessoa/:id/adicionarviagem",
  async (req: Request, res: Response): Promise<Response> => {
    let id: number = Number(req.params.id);
    let viagem: Viagem = new Viagem();

    try {
      if (id >= 0 && id < pessoas.length) {
        viagem.id = 
        viagem.idPessoa = id;
        viagem.destino = req.body.destino;
        if (
          req.body.dataHoraPartida === null ||
          req.body.dataHoraChegada === null
        ) {
          let erro = {
            erro: "Formato de data está errado, tente encaixar nesse formato: YYYY-MM-DDTHH:MM:SSZ",
          };
          return res.status(400).json(erro);
        } else {
          viagem.dataHoraPartida = new Date(req.body.dataHoraPartida);
          viagem.dataHoraChegada = new Date(req.body.dataHoraChegada);
        }

        pessoas[id].viagens.push(viagem);

        return res.status(200).json(pessoas[id]);
      }
    } catch (error) {
      let erro = {
        erro: "Verifique o id da pessoa!",
      };
      return res.status(400).json(erro);
    }

    let erro = {
      id: id,
      erro: "Id da pessoa não foi encontrada.",
    };

    return res.status(400).json(erro);
  }
);
// NOTE Remover uma viagem
server.post(
  "/pessoa/:id/removerviagem/:posicao",
  async (req: Request, res: Response): Promise<Response> => {
    let id: number = Number(req.params.id);
    let posicao: number = Number(req.params.posicao);
    let viagem: Viagem = new Viagem();

    if (id >= 0 && id < pessoas.length) {
      if (posicao >= 0 && posicao < pessoas[id].viagens.length) {
        pessoas[id].viagens.splice(posicao);
        return res.status(200).json(pessoas[id]);
      }
      let erro = {
        posicao: posicao,
        erro: "Posição da viagem não foi encontrada.",
      };

      return res.status(400).json(erro);
    }

    let erro = {
      id: id,
      erro: "Id da pessoa não foi encontrada.",
    };

    return res.status(400).json(erro);
  }
);

server.listen(3000, () => {
  console.log("Server started on port 3000 http://localhost:3000/");
});
