import { CriarInstituicaoUseCase } from '@/application/usecase/instituicao/criar-instituicao.usecase';
import { Instituicao } from '@/domain/models/instituicao';
import { Component, inject, ViewChild } from '@angular/core';
import { TableInstituicoesComponent } from './components/table-instituicoes/table-instituicoes.component';
import { MatButtonModule } from '@angular/material/button';
import { InputSearchComponent, ModalService } from '@tivic-team/tivic-ui';
import { ModalFormCreateInstituicaoComponent } from './components/modal-form-create-instituicao/modal-form-create-instituicao.component';
import { FiltersInputsComponent } from '@/presentation/components/filters-inputs/filters-inputs.component';

@Component({
  selector: 'app-intituicoes-page',
  standalone: true,
  imports: [TableInstituicoesComponent, MatButtonModule, FiltersInputsComponent, InputSearchComponent],
  templateUrl: './instituicoes-page.component.html',
  styleUrl: './instituicoes-page.component.scss'
})
export class IntituicoesPageComponent {
  private _modalService = inject(ModalService<ModalFormCreateInstituicaoComponent>);
  @ViewChild(TableInstituicoesComponent) tableInstituicoes!: TableInstituicoesComponent;
  constructor(
  ){}
  icon = "la la-plus-circle"

  cadastrar() {
    this._modalService.component(ModalFormCreateInstituicaoComponent).open();
    this._modalService.onDismiss().subscribe(() => {
      if (this.tableInstituicoes) {
        this.tableInstituicoes.load();
        this.tableInstituicoes.pageIndex = 0
      }
    });
  }
}
