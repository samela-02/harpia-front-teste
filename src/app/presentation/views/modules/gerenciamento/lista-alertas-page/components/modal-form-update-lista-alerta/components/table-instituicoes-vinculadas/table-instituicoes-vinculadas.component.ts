import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao/instituicao.filter';
import { Instituicao } from '@/domain/models/command/instituicao';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { BuscarInstituicoesAction } from '@/infrastructure/store/actions/instituicao.actions';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { NoTableComponent } from '@/presentation/shared/components/no-table/no-table.component';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggle, MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngxs/store';
import { VincularInstituicaoUseCase } from '@/application/usecase/lista-alerta/vincular-instituicao.usecase';
import { DesvincularInstituicaoUseCase } from '@/application/usecase/lista-alerta/desvincular-instituicao.usecase';
import { CustomDialogService, makeDeleteCustomDialog, SnackbarService } from '@tivic-team/tivic-ui';
import { ListaAlertaFilter, ListaAlertaProps } from '@/domain/filters/lista-alerta/lista-alerta.filter';
import { BuscarListaAlertaAction } from '@/infrastructure/store/actions/lista-alerta.actions';
import { ListaAlertaAcessoQueryResponse } from '@/domain/models/query/lista-alerta-acesso-query-response';

@Component({
  selector: 'app-table-instituicoes-vinculadas',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, NoTableComponent, MatSlideToggleModule],
  templateUrl: './table-instituicoes-vinculadas.component.html',
  styleUrl: './table-instituicoes-vinculadas.component.scss'
})

export class TableInstituicoesVinculadasComponent extends TablePageBase {
  private _store = inject(Store);
  private _customDialog = inject(CustomDialogService);
  private _snackbar = inject(SnackbarService);

  @Input() instituicoesVinculadas: ListaAlertaAcessoQueryResponse[];
  @Input() cdListaAlerta: number;
  private vinculadasIds: Set<string> = new Set();

  override currentFilters?: InstituicaoProps;
  public instituicoes = this._store.selectSignal(InstituicaoSelectors.instituicaoVinculadas);
  public dataLength = 0

  constructor(
    private vincularInstituicaoUseCase: VincularInstituicaoUseCase,
    private desvincularInstituicaoUseCase: DesvincularInstituicaoUseCase
  ) {
    super()
  }

  ngOnInit(): void {
    this.load();
    this.loadVinculadasIds();
  }

  private loadVinculadasIds() {
    this.vinculadasIds.clear();
    if (this.instituicoesVinculadas) {
      this.instituicoesVinculadas.forEach(instituicao => {
        this.vinculadasIds.add(instituicao.idInstituicao);
      });
    }
  }

  public isVinculada(id: string): boolean {
    return this.vinculadasIds.has(id);
  }

  public vincularInstituicao(idInstituicao: string, toggle: MatSlideToggle) {
    const dialog = this._customDialog.confirm(({
      title: "Vincular Instituição",
      icon: {
        name: 'factory',
        size: 'normal',
        color: 'primary'
      },
      confirmLabel: 'Sim',
      cancelLabel: 'Cancelar',
      message: 'Deseja vincular esta instituição a esta lista de alerta?'
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.vincularInstituicaoUseCase.execute(this.cdListaAlerta, idInstituicao).subscribe({
          next: () => {
            this._snackbar.success("Instituição vinculada com sucesso");
            this.vinculadasIds.add(idInstituicao);
            this.loadListaAlerta();
          },
          error: () => {
             toggle.checked = false;
             this._snackbar.error("Falha ao vincular instituição.");
          }
        })
      } else {
        toggle.checked = false;
      }
    });
  }

  public desvincularInstituicao(idInstituicao: string, toggle: MatSlideToggle) {
    const dialog = this._customDialog.confirm(({
      title: "Desvincular Instituição",
      icon: {
        name: 'factory',
        size: 'normal',
        color: 'warn'
      },
      confirmLabel: 'Sim',
      cancelLabel: 'Cancelar',
      message: 'Deseja desvincular esta instituição desta lista de alerta?'
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desvincularInstituicaoUseCase.execute(this.cdListaAlerta, idInstituicao).subscribe({
          next: () => {
            this._snackbar.success("Instituição desvinculada com sucesso");
            this.vinculadasIds.delete(idInstituicao);
            this.loadListaAlerta();
          },
          error: () => {
            toggle.checked = true;
            this._snackbar.error("Falha ao desvincular instituição.");
          }
        })
      } else {
         toggle.checked = true;
      }
    });
  }

  public load(filters?: InstituicaoProps, page: number = 0) {
    const paginationProps: InstituicaoProps = {
      page: page,
      size: 4,
      lgAtivo: 1,
    };
    const filterProps = new InstituicaoFilter(paginationProps);

    this._store.dispatch(new BuscarInstituicoesAction(filterProps)).subscribe(() => {
      this.dataLength = this.instituicoes()?.data?.totalItens ?? 0;
    })
  }

  public loadListaAlerta(filters?: ListaAlertaProps, page: number = 0) {
    const paginationProps: ListaAlertaProps = {
      page: page,
      size: this.pageSize,
    };
    const filterProps = new ListaAlertaFilter(paginationProps);
    this._store.dispatch(new BuscarListaAlertaAction(filterProps)).subscribe(() => {
    })
  }


  rowChange(event: MouseEvent, instituicao: Instituicao) {
    event.stopPropagation();
    event.preventDefault();
  }

  displayedColumns: string[] = ['idInstituicao', 'vinculada'];

  public onToggleChange(event: MatSlideToggleChange, idInstituicao: string) {
    const intendedState = event.checked;
    const toggle = event.source;

    toggle.checked = !intendedState;

    if (intendedState) {
      this.vincularInstituicao(idInstituicao, toggle);
    } else {
      this.desvincularInstituicao(idInstituicao, toggle);
    }
  }
}
