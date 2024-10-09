import express, { Express, Request, Response } from "express";
import cors from "cors";
import { FormaPagamento } from "./FormaPagamento";
import { Usuario } from "./Usuario";
import { dbQuery, client } from "./database";
import { UnidadeMedida } from "./UnidadeMedida";
import { SendEmail } from "./SendEmail";

const port: Number = 3000;
let server: Express = express();

server.use(cors());
server.use(express.json());

let success = {
  insert: "Dado inserido com sucesso!",
  update: "Dado atualizado com sucesso!",
  delete: "Dado deletado com sucesso!",
};

// NOTE <-- Forma de pagamento -->

// NOTE Criar formas de pagamento
server.post(
  "/formaDePagamento",
  async (req: Request, res: Response): Promise<Response> => {
    let formaPagamento: FormaPagamento = new FormaPagamento();

    formaPagamento.name = req.body.name;

    await formaPagamento.save();
    return res.status(200).json(success.insert);
  }
);

// NOTE Listar formas de pagamento
server.get(
  "/formaDePagamento",
  async (req: Request, res: Response): Promise<Response> => {
    let formaPagamento: FormaPagamento = new FormaPagamento();

    let result = await formaPagamento.findAll();
    return res.status(200).json(result);
  }
);

// NOTE Pegar uma forma de pagamento
server.get(
  "/formaDePagamento/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let formaPagamento: FormaPagamento = new FormaPagamento();

    if (id > 0) {
      let result = await formaPagamento.findOneById(id);
      return res.status(200).json(result);
    }
    let erro = {
      erro: "Não foi possivel encontrar a forma de pagamento",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Editar forma de pagamento
server.put(
  "/formaDePagamento/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let formaPagamento: FormaPagamento = new FormaPagamento();

    formaPagamento.id = id;
    formaPagamento.name = req.body.name;

    if (id > 0 && formaPagamento.name.length > 0) {
      let result = await formaPagamento.save();

      return res.status(200).json(success.update);
    }
    let erro = {
      erro: "Não foi possivel encontrar a forma de pagamento",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Deletar forma de pagamento
server.delete(
  "/formaDePagamento/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let formaPagamento: FormaPagamento = new FormaPagamento();

    formaPagamento.id = id;

    if (id > 0) {
      let result = await formaPagamento.delete();
      if (result) {
        return res.status(200).json(success.delete);
      }
      let erro = {
        erro: "Não foi possivel deletar forma de pagamento devido a um erro do servidor",
      };
      return res.status(400).json(erro);
    }
    let erro = {
      erro: "Não foi possivel encontrar a forma de pagamento",
    };
    return res.status(400).json(erro);
  }
);

// NOTE <-- Usuario -->

// NOTE Validar usuario de adm
server.post(
  "/usersADM",
  async (req: Request, res: Response): Promise<Response> => {
    let usuario = new Usuario();

    usuario.username = req.body.username;
    usuario.password = req.body.password;

    let result = await usuario.findUser();

    if (result == true) {
      return res.status(200).json(result);
    }

    let erro = {
      erro: "Um dos campos estão vazios, verifique novamente!",
    };
    return res.status(400).json(erro);
  }
);

// NOTE <-- Unidade de medida -->

// NOTE Listar unidades de medida
server.get(
  "/unidademedida",
  async (req: Request, res: Response): Promise<Response> => {
    let unidadeMedida: UnidadeMedida = new UnidadeMedida();
    let result = await unidadeMedida.findAll();
    return res.status(200).json(result);
  }
);

// NOTE Pegar uma unidade de medida
server.get(
  "/unidademedida/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let unidadeMedida: UnidadeMedida = new UnidadeMedida();

    if (id > 0) {
      let result = await unidadeMedida.findOneById(id);
      return res.status(200).json(result);
    }

    let erro = {
      erro: "Não foi possivel encontrar a unidade de medida",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Criar unidade de medida
server.post(
  "/unidademedida",
  async (req: Request, res: Response): Promise<Response> => {
    let unidadeMedida: UnidadeMedida = new UnidadeMedida();

    unidadeMedida.name = req.body.name;

    if (unidadeMedida.name.length > 0 && unidadeMedida.name.length <= 2) {
      let result = await unidadeMedida.save();
      return res.status(200).json(success.insert);
    }
    let erro = {
      erro: "Insira um valor de no máximo 2 letras!",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Atualizar unidade de medida
server.put(
  "/unidademedida/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let unidadeMedida: UnidadeMedida = new UnidadeMedida();
    unidadeMedida.name = req.body.name;
    unidadeMedida.id = id;

    if (
      id > 0 &&
      unidadeMedida.name.length > 0 &&
      unidadeMedida.name.length <= 2
    ) {
      let result = await unidadeMedida.save();
      return res.status(200).json(success.update);
    } else if (unidadeMedida.name.length > 2) {
      let erro = {
        erro: "Insira um valor de no máximo 2 letras!",
      };
      return res.status(400).json(erro);
    }

    let erro = {
      erro: "Não foi possivel encontrar a unidade de medida",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Deletar unidade de medida
server.delete(
  "/unidademedida/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let unidadeMedida: UnidadeMedida = new UnidadeMedida();

    unidadeMedida.id = id;

    if (id > 0) {
      let result = await unidadeMedida.delete();
      return res.status(200).json(success.delete);
    }

    let erro = {
      erro: "Não foi possivel encontrar a unidade de medida",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Mandar relatório de forma de pagamento por email
server.get(
  "/relatorio/formapagamento",
  async (req: Request, res: Response): Promise<Response> => {
    let formaPagamento: SendEmail = new SendEmail();

    let result = await formaPagamento.findAllFormaPagamento();
    return res.status(200).json(result);
  }
);

// NOTE Mandar relatório de unidade de medida por email
server.get(
  "/relatorio/unidademedida",
  async (req: Request, res: Response): Promise<Response> => {
    let unidadeMedida: SendEmail = new SendEmail();

    let result = await unidadeMedida.findAllUnidadeMedidaEmail();

    return res.status(200).json(result);
  }
);

// NOTE <-- Servidor (não mexer) -->

const serverInstance = server.listen(port, () => {});

const gracefulShutdown = () => {
  serverInstance.close(() => {
    client.end();
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
