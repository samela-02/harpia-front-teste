import { Alerta } from '@/domain/models/command/alerta';
import { Veiculo } from '@/domain/models/command/veiculo-deteccao';
import { VeiculoDeteccaoQueryResponse } from '@/domain/models/query/veiculo-deteccao-query-response';
import { BuscarVeiculoPorPlacaAction } from '@/infrastructure/store/actions/alerta.actions';
import { AlertaSelectors } from '@/infrastructure/store/selectors/alerta.selectors';
import { ListaAlertaSelectors } from '@/infrastructure/store/selectors/lista-alerta.selectors';
import { TipoAlertaSelectors } from '@/infrastructure/store/selectors/tipo-alerta.selectors';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { DatetimeComponent, DropdownComponent, FormType, SnackbarService, TextareaComponent } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-alerta',
  standalone: true,
  imports: [
    TextareaComponent,
    MatButtonModule,
    DatetimeComponent,
    DropdownComponent,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './form-alerta.component.html',
  styleUrl: './form-alerta.component.scss'
})
export class FormAlertaComponent {
  private _snackbar = inject(SnackbarService);
  private _store = inject(Store);

  public cdListaAlerta = this._store.selectSignal(ListaAlertaSelectors.cdListaAlerta);
  public veiculos = this._store.selectSignal(AlertaSelectors.veiculo);
  public veiculosFiltrados: VeiculoDeteccaoQueryResponse[] = [];
  public placaVeiculo: string = '';
  public veiculoNaoEncontrado: boolean = false;

  public tiposAlertasDrop = () => this._store.select(TipoAlertaSelectors.tiposAlertasSelect)

  @Input() formGroup!: FormGroup<FormType<Alerta>>;
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public route = inject(ActivatedRoute)

  onPlacaInput() {
    this.veiculoNaoEncontrado = false;
    if (this.placaVeiculo && this.placaVeiculo.length === 7) {
      this.veiculosFiltrados = []
      this.loadVeiculo(this.placaVeiculo);
    }
  }

  onVeiculoSelected(event: MatAutocompleteSelectedEvent) {
    const veiculo = event.option.value;
    this.formGroup.get('cdVeiculo')?.setValue(veiculo.cdVeiculo);
  }

  loadVeiculo(nrPlaca: string) {
    this._store.dispatch(new BuscarVeiculoPorPlacaAction(nrPlaca)).subscribe(() => {
      const veiculo = this.veiculos()?.data;
      console.log(this.veiculos())
      if (veiculo) {
        const existeVeiculo = this.veiculosFiltrados.some(v => v.cdVeiculo === veiculo.cdVeiculo);
        if (!existeVeiculo) {
          this.veiculosFiltrados = [...this.veiculosFiltrados, veiculo];
          console.log(this.veiculosFiltrados)
        }
        this.veiculoNaoEncontrado = false;
      } else {
        this.veiculoNaoEncontrado = true;
        this._snackbar.error('Veículo não encontrado. É necessário cadastrá-lo.');
      }
    });
  }
}
