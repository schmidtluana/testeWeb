import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http:HttpClient) { }

  selecionar() {
    return this.http.get<Pessoa[]>('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro');
  }

  deleteLine(id:number) {
    return this.http.delete('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/' + id);
  }

  updateLine(id:number, f:Pessoa) {
    return this.http.put<Pessoa>('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/' + id, f);
  }

}
