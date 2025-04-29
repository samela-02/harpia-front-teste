import { TipoAlertaFilter, TipoAlertaProps } from '@/domain/filters/tipo-alerta/tipo-alerta.filter';
import { TipoAlerta } from '@/domain/models/command/tipo-alerta';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { BuscarTiposAlertasAction } from '@/infrastructure/store/actions/tipo-alerta.actions';
import { TipoAlertaSelectors } from '@/infrastructure/store/selectors/tipo-alerta.selectors';
import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { BadgeComponent, ModalService } from '@tivic-team/tivic-ui';
import { ModalFormTipoAlertaUpdateComponent } from '../modal-form-update-tipo-alerta/modal-form-update-tipo-alerta.component';
import { tableModule } from '@/presentation/shared/table.module';
import { NoTableComponent } from '@/presentation/shared/components/no-table/no-table.component';
import { ListaAlertaSelectors } from '@/infrastructure/store/selectors/lista-alerta.selectors';

@Component({
  selector: 'app-table-tipo-alertas',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, BadgeComponent, NoTableComponent],
  templateUrl: './table-tipo-alertas.component.html',
  styleUrl: './table-tipo-alertas.component.scss'
})

export class TableTipoAlertasComponent extends TablePageBase{
  @Input() formGroup: FormGroup = new FormGroup({});
  private _store = inject(Store);
  private _route = inject(ActivatedRoute);
  private _modalService = inject(ModalService<ModalFormTipoAlertaUpdateComponent>);

  public cdListaAlerta = this._store.selectSignal(ListaAlertaSelectors.cdListaAlerta);
  public tipoAlertas = this._store.selectSignal(TipoAlertaSelectors.tiposAlertas);

  public override currentFilters?: TipoAlertaProps;

  dataLength = 0

  ngOnInit(): void {
    this.load();
  }

  public load(filters?: TipoAlertaProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }
    const paginationProps: TipoAlertaProps = {
      page: page,
      size: this.pageSize,
    };
    const filterProps = new TipoAlertaFilter(paginationProps);

    this._store.dispatch(new BuscarTiposAlertasAction(filterProps)).subscribe(() => {
      this.dataLength = this.tipoAlertas()?.data?.totalItens || 0;
    })
  }

  rowChange(event: MouseEvent, tipoAlerta: TipoAlerta ){
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalFormTipoAlertaUpdateComponent).open(tipoAlerta);
  }

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }

  displayedColumns: string[] = ['nvCor','nmTipoAlerta', 'nvTipoAlerta'];
}
