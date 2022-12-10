import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../../model/pessoa';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  vetPessoas: Pessoa[] = this.fazerRequisicao();
  vPessoas: Pessoa = {
    id: 0,
    nome: "",
    departamento:"",
    endereco:"",
    email:"",
    editando:false
  }


  fazerRequisicao() : any {
    fetch('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro',
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      this.vetPessoas = [...json];
    });
  }



habilitarEdicaoLine(pessoa: Pessoa): any {
  pessoa.editando = true;
}

updateLine(pessoa: Pessoa): any {
  fetch('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro',
  {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    method: 'PUT',
    body: JSON.stringify({
      id: pessoa.id,
      nome: pessoa.nome,
      departamento: pessoa.departamento,
      endereco: pessoa.endereco,
      email: pessoa.email
    })
  })
  .then(response => response.json())
  .then(json => {
    pessoa.editando = false;
  });
}


deleteLine(pessoaId: number): any {
  fetch('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro' + pessoaId,
  {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    method: 'DELETE',
    body: JSON.stringify({
      id: pessoaId,
    })
  })
  .then(response => response.json())
  .then(json => {
    this.vetPessoas.splice(pessoaId-1,1)
    alert(json.mensagem)
  });
}


ngOnInit(): void {
  throw new Error('Método não implementado.')
}


}




