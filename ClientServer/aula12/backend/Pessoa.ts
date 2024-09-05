import { Viagem } from "./Viagem";

export class Pessoa {
  id: number = 0;
  nome: string = "";
  cpf: string = "";
  idade: number = 0;
  siglaUf: string = "";
  cidade: string = "";
  viagens: Viagem[] = [];
}
