import { CriarInstituicaoUseCase } from '@/application/usecase/instituicao/criar-instituicao.usecase';
import { Instituicao } from '@/domain/models/instituicao';
import { Component, inject } from '@angular/core';
import { TableInstituicoesComponent } from './components/table-instituicoes/table-instituicoes.component';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormCreateInstituicaoComponent } from './components/modal-form-create-instituicao/modal-form-create-instituicao.component';

@Component({
  selector: 'app-intituicoes-page',
  standalone: true,
  imports: [TableInstituicoesComponent, MatButtonModule],
  templateUrl: './instituicoes-page.component.html',
  styleUrl: './instituicoes-page.component.scss'
})
export class IntituicoesPageComponent {
  private _modalService = inject(ModalService<ModalFormCreateInstituicaoComponent>);
  constructor(
  ){}
  icon = "la la-plus-circle"

  cadastrar() {
    this._modalService.component(ModalFormCreateInstituicaoComponent).open();
  }
}
