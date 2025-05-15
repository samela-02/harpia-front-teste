import { BuscarDadosDeUsuarioUseCase } from '@/application/usecase/usuario/buscar-dados-de-usuario.usecase';
import { UsuarioLogadoResponse } from '@/domain/dtos/usuarioLogadoResponse.dto';
import { UsuarioRole } from '@/domain/enums/usuario-role.enum';
import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { sharedModule } from '@/presentation/shared/shared';
import { CommonModule } from '@angular/common';
import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '@tivic-team/tivic-ui';
import { FilterEquipamentoComponent } from './components/filter-equipamentos/filter-equipamento.component';
import { ModalFormCreateEquipamentoComponent } from './components/modal-form-create-equipamento/modal-form-create-equipamento.component';
import { TableEquipamentosComponent } from './components/table-equipamentos/table-equipamentos.component';

@Component({
  selector: 'app-lista-equipamentos',
  standalone: true,
  imports: [TableEquipamentosComponent, CommonModule, MatButtonModule, FilterEquipamentoComponent, FiltersInputsComponent, ...sharedModule],
  templateUrl: './lista-equipamentos.component.html',
  styleUrl: './lista-equipamentos.component.scss',
})
export class ListaEquipamentosComponent {
  private _modalService = inject(ModalService<ModalFormCreateEquipamentoComponent>);
  private _formBuilder = inject(FormBuilder);

  public usuarioLogado: UsuarioLogadoResponse;
  public UsuarioRole = UsuarioRole;

  @ViewChild(TableEquipamentosComponent) tableEquipamentos!: TableEquipamentosComponent;

  constructor(private buscarDadosDeUsuario: BuscarDadosDeUsuarioUseCase
  ) {
    this.buscarDadosDeUsuario.execute().subscribe((usuario) => {
      this.usuarioLogado = usuario.data
    })
  }

  icon = "la la-plus-circle"

  formGroup: FormGroup = this._formBuilder.group({
    nmEquipamento: [''],
    idEquipamento: [''],
    nrSerie: [''],
    cdInstituicao: [''],
    cdTipoEquipamento: [''],
    dtAlocacaoInferior: [null],
    dtAlocacaoSuperior: [null],
    dtDelecaoInferior: [null],
    dtDelecaoSuperior: [null]
  });

  table = viewChild<TableEquipamentosComponent>(TableEquipamentosComponent);

  onSearch() {
    if (!this.table()) return;
    const filters = this.formGroup.getRawValue()
    this.table().load(filters);
  }

  cadastrar() {
    this._modalService.component(ModalFormCreateEquipamentoComponent).open();
  }
}
