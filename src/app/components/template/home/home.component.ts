import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../../model/pessoa';
import { PessoaService } from '../../../service/pessoa.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private servico: PessoaService) {}

  vetPessoas: Pessoa[] = [];

  id: number = 0;
  nome: string = '';
  departamento: string = '';
  endereco: string = '';
  email: string = '';

  alerta: string = '';

  ngOnInit() {
    this.iniciarRequisicao();
  }

  iniciarRequisicao(): void {
    this.servico.buscarRegistros().subscribe({
      next: (retorno) => (this.vetPessoas = retorno),
    });
  }

  podeEditarRegistro(pessoa: Pessoa): any {
    pessoa.editando = true;
  }

  // Opção 1 para chamar a api

  atualizarRegistro(pessoa: Pessoa): any {
    let resposta = confirm('Você confirma a alteração do funcionário?');

    if (resposta) {
      fetch('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        method: 'PUT',
        body: JSON.stringify({
          id: pessoa.id,
          nome: pessoa.nome,
          departamento: pessoa.departamento,
          endereco: pessoa.endereco,
          email: pessoa.email,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          pessoa.editando = false;

          if (json.status == 'Ok') {
            document.getElementById('alerta')?.classList.remove('alert-danger');
            document.getElementById('alerta')?.classList.add('alert-success');
            this.alerta = json.mensagem;
          } else {
            document
              .getElementById('alerta')
              ?.classList.remove('alert-success');
            document.getElementById('alerta')?.classList.add('alert-danger');
            this.alerta = json.mensagem;
          }
        });
    }
  }

  // Opção 2 para chamar a api

  removerRegistro(id: number): void {
    let resposta = confirm('Você confirma a remoção do funcionário?');

    if (resposta) {
      this.servico.remover(id).subscribe((retorno) => {
        let pesquisaId = this.vetPessoas.findIndex((obj) => {
          return obj.id === id;
        });

        let dados = JSON.stringify(retorno);
        let json = JSON.parse(dados);

        if (json.status == 'Ok') {
          document.getElementById('alerta')?.classList.remove('alert-danger');
          document.getElementById('alerta')?.classList.add('alert-success');
          this.alerta = json.mensagem;
          this.vetPessoas.splice(pesquisaId, 1);
        } else {
          document.getElementById('alerta')?.classList.remove('alert-success');
          document.getElementById('alerta')?.classList.add('alert-danger');
          this.alerta = json.mensagem;
        }
      });
    }
  }
}
