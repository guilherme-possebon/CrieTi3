import express, { Express, Request, Response } from "express";
import cors from "cors";
import { FormaPagamento } from "./FormaPagamento";

const port: Number = 3000;
let server: Express = express();

server.use(cors());
server.use(express.json());

interface usuariosAdminInterface {
  id: number;
  user: string;
  password: string;
}

let usuariosADM: usuariosAdminInterface = {
  id: 1,
  user: "admin",
  password: "admin",
};

let formasPagamentos: FormaPagamento[] = [];

// NOTE Criar formas de pagamento
server.post(
  "/formaDePagamento",
  async (req: Request, res: Response): Promise<Response> => {
    let formaPagamento = new FormaPagamento();

    formaPagamento.id = formasPagamentos.length;
    formaPagamento.name = req.body.name;

    formasPagamentos.push(formaPagamento);

    return res.status(200).json(formasPagamentos);
  }
);

// NOTE Listar formas de pagamento
server.get(
  "/formaDePagamento",
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(formasPagamentos);
  }
);

server.get(
  "/formaDePagamento/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);

    if (id >= 0 && id < formasPagamentos.length) {
      return res.status(200).json(formasPagamentos[id]);
    }
    let erro = {
      erro:
        "Não foi possivel encontrar um livro com o codigo digitado, tente um código de 0 até " +
        (formasPagamentos.length - 1),
    };
    return res.status(400).json(erro);
  }
);

// NOTE Editar forma de pagamento
server.put(
  "/formaDePagamento/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);

    if (id >= 0 && id < formasPagamentos.length) {
      let formaPagamento = formasPagamentos[id];

      formaPagamento.name = req.body.name;

      return res.status(200).json(formasPagamentos[id]);
    }
    let erro = {
      erro:
        "Não foi possivel encontrar um livro com o codigo digitado, tente um código entre 0 e " +
        formasPagamentos.length,
    };
    return res.status(400).json(erro);
  }
);

// NOTE Deletar forma de pagamento
server.delete(
  "/formaDePagamento/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);

    if (id >= 0 && id < formasPagamentos.length) {
      delete formasPagamentos[id];
      return res.status(200).json("Forma de pagamento deletada com sucesso!");
    }
    let erro = {
      erro:
        "Não foi possivel encontrar um livro com o codigo digitado, tente um código entre 0 e " +
        formasPagamentos.length,
    };
    return res.status(400).json(erro);
  }
);

server.get(
  "/usersADM",
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(usuariosADM);
  }
);

server.listen(port, () => {
  console.log("Server iniciado na porta " + port);
});
