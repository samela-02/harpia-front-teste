import { CriarInstituicaoUseCase } from '@/application/usecase/instituicao/criar-instituicao.usecase';
import { Instituicao } from '@/domain/models/command/instituicao';
import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { TableInstituicoesComponent } from './components/table-instituicoes/table-instituicoes.component';
import { MatButtonModule } from '@angular/material/button';
import { InputSearchComponent, ModalService } from '@tivic-team/tivic-ui';
import { ModalFormCreateInstituicaoComponent } from './components/modal-form-create-instituicao/modal-form-create-instituicao.component';
import { FiltersInputsComponent } from '@/presentation/components/filters-inputs/filters-inputs.component';
import { FilterInstituicaoComponent } from './components/filter-instituicao/filter-instituicao.component';
import { FormControl, FormGroup } from '@angular/forms';
import { sharedModule } from '@/presentation/shared/shared';

@Component({
  selector: 'app-intituicoes-page',
  standalone: true,
  imports: [TableInstituicoesComponent, MatButtonModule, FiltersInputsComponent, FilterInstituicaoComponent, ...sharedModule],
  templateUrl: './instituicoes-page.component.html',
  styleUrl: './instituicoes-page.component.scss'
})
export class IntituicoesPageComponent {
  private _modalService = inject(ModalService<ModalFormCreateInstituicaoComponent>);
  @ViewChild(TableInstituicoesComponent) tableInstituicoes!: TableInstituicoesComponent;
  constructor(
  ){}
  icon = "la la-plus-circle"

  formGroup: FormGroup = new FormGroup({
    nmInstituicao: new FormControl<string>("", { nonNullable: true }),
    idInstituicao: new FormControl<string>("", { nonNullable: true }),
  });

  table = viewChild<TableInstituicoesComponent>(TableInstituicoesComponent);

  onSearch() {
    if (!this.table()) return;
    const filters = {
      nmInstituicao: this.formGroup.get('nmInstituicao')?.value,
      idInstituicao: this.formGroup.get('idInstituicao')?.value
    };
    this.table().load(filters);
  }

  cadastrar() {
    this._modalService.component(ModalFormCreateInstituicaoComponent).open();
  }
}
