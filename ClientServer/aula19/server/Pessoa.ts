import { Viagem } from "./Viagem";

export class Pessoa {
  id: number = 0;
  nome: string = "";
  cpf: string = "";
  idade: number = 0;
  siglauf: string = "";
  cidade: string = "";
  viagens: Viagem[] = [];
}
