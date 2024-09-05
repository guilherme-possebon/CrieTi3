import { Endereco } from "./Endereco";

export class Pessoa {
  public nome: string = "";
  public sobrenome: string = "";
  public cpf: string = "";
  public dataNascimento: string = "";
  public enderecos: Endereco[] = [];
  public telefones: string[] = [];

  public addTelefone(numeroTelefone: string) {
    this.telefones.push(numeroTelefone);
  }

  public addEndereco(endereco: Endereco) {
    this.enderecos.push(endereco);
  }
}
