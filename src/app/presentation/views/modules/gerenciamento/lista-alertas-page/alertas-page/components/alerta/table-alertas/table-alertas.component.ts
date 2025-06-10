import { AlertaFilter, AlertaProps } from '@/domain/filters/alerta/alerta.filter';
import { Alerta } from '@/domain/models/command/alerta';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { TruncatePipe } from '@/infrastructure/pipe/truncate.pipe';
import { BuscarAlertaAction } from '@/infrastructure/store/actions/alerta.actions';
import { AlertaSelectors } from '@/infrastructure/store/selectors/alerta.selectors';
import { ListaAlertaSelectors } from '@/infrastructure/store/selectors/lista-alerta.selectors';
import { NoTableComponent } from '@/presentation/shared/components/no-table/no-table.component';
import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { BadgeComponent, ModalService } from '@tivic-team/tivic-ui';
import { ModalDetalhesAlertaComponent } from '../modal-detalhes-alerta/modal-detalhes-alerta.component';
@Component({
  selector: 'app-table-alertas',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, BadgeComponent, NoTableComponent, DatePipe, TruncatePipe],
  templateUrl: './table-alertas.component.html',
  styleUrl: './table-alertas.component.scss'
})

export class TableAlertasComponent extends TablePageBase{
  @Input() formGroup: FormGroup = new FormGroup({});
  private _store = inject(Store);
  private _route = inject(ActivatedRoute);
  private _modalService = inject(ModalService<ModalDetalhesAlertaComponent>);

  public cdListaAlerta = this._store.selectSignal(ListaAlertaSelectors.cdListaAlerta);
  public alertas = this._store.selectSignal(AlertaSelectors.alertas);

  public override currentFilters?: AlertaProps;

  dataLength = 0

  ngOnInit(): void {
    this.load();
  }

  public load(filters?: AlertaProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }
    const paginationProps: AlertaProps = {
      page: page,
      size: this.pageSize,
      cdListaAlerta: this.cdListaAlerta(),
      nrPlaca: this.currentFilters?.nrPlaca
    };
    const filterProps = new AlertaFilter(paginationProps);

    this._store.dispatch(new BuscarAlertaAction(filterProps)).subscribe(() => {
      this.dataLength = this.alertas()?.data?.totalItens || 0;
    })
  }

  rowChange(event: MouseEvent, alerta: Alerta ){
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalDetalhesAlertaComponent).open(alerta);
  }

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }

  displayedColumns: string[] = ['nvCor', 'nrPlaca', 'nmTipoAlerta', 'dsAlerta', 'dtAlerta'];

  fecharModal() {
    this._modalService.dismiss();
  }
}
