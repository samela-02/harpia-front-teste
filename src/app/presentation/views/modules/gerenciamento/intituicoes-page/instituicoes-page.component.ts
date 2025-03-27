import { CriarInstituicaoUseCase } from '@/application/usecase/instituicao/criar-instituicao.usecase';
import { Instituicao } from '@/domain/models/instituicao';
import { Component, inject } from '@angular/core';
import { ModalCreateInstituicaoComponent } from './components/modal-create-instituicao/modal-create-instituicao.component';
import { ModalService } from '@/infrastructure/services/modal/modal.service';
import { TableInstituicoesComponent } from './components/table-instituicoes/table-instituicoes.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-intituicoes-page',
  standalone: true,
  imports: [TableInstituicoesComponent, MatButtonModule],
  templateUrl: './instituicoes-page.component.html',
  styleUrl: './instituicoes-page.component.scss'
})
export class IntituicoesPageComponent {
  private _modalService = inject(ModalService<ModalCreateInstituicaoComponent>);
  icon = "la la-plus-circle"

  cadastrar() {
    this._modalService.component(ModalCreateInstituicaoComponent).open();
  }
}
