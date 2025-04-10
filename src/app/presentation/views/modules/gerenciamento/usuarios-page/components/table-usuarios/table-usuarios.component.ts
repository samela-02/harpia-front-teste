import { UsuarioFilter, UsuarioProps } from '@/domain/filters/usuario/usuario.filter';
import { Instituicao } from '@/domain/models/command/instituicao';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { BuscarUsuariosAction } from '@/infrastructure/store/actions/usuario.actions';
import { UsuarioSelectors } from '@/infrastructure/store/selectors/usuario.selectors';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormUsuarioUpdateComponent } from '../modal-form-update-usuario/modal-form-update-usuario.component';
import { NoTableComponent } from '@/presentation/components/no-table/no-table.component';

@Component({
  selector: 'app-table-usuarios',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, NoTableComponent],
  templateUrl: './table-usuarios.component.html',
  styleUrl: './table-usuarios.component.scss'
})

export class TableUsuariosComponent extends TablePageBase{
  @Input() formGroup: FormGroup = new FormGroup({});
  private _store = inject(Store);
  private _modalService = inject(ModalService<ModalFormUsuarioUpdateComponent>);
  public usuarios = this._store.selectSignal(UsuarioSelectors.usuario);
  override currentFilters?: UsuarioProps;

  dataLength = 0

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
    this.load();
  }

  public load(filters?: UsuarioProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }
    const paginationProps: UsuarioProps = {
      page: page,
      size: this.pageSize,
      nmUsuario: this.currentFilters?.nmUsuario,
      role: this.currentFilters?.role,
      cdInstituicao: this.currentFilters?.cdInstituicao
    };
    const filterProps = new UsuarioFilter(paginationProps);
    this._store.dispatch(new BuscarUsuariosAction(filterProps)).subscribe(() => {
      this.dataLength = this.usuarios().data.totalItens;
    })
  }

  rowChange(event: MouseEvent, instituicao: Instituicao ){
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalFormUsuarioUpdateComponent).open(instituicao);
  }

  getSituacao = (lgAtivo: boolean) => lgAtivo ? "Ativo" : "Inativo";

  displayedColumns: string[] = ['nmUsuario', 'nmEmail', 'nmCargo', 'role', 'lgAtivo'];
}
