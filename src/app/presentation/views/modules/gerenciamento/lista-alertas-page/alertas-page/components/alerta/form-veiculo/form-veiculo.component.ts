import { optionsCoresVeiculos } from '@/domain/enums/alerta/cores-veiculo.enum';
import { Veiculo } from '@/domain/models/command/veiculo-deteccao';
import { VeiculoDeteccaoQueryResponse } from '@/domain/models/query/veiculo-deteccao-query-response';
import { BuscarVeiculoPorPlacaAction } from '@/infrastructure/store/actions/alerta.actions';
import { AlertaSelectors } from '@/infrastructure/store/selectors/alerta.selectors';
import { ListaAlertaSelectors } from '@/infrastructure/store/selectors/lista-alerta.selectors';
import { TipoAlertaSelectors } from '@/infrastructure/store/selectors/tipo-alerta.selectors';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormType, InputComponent } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-veiculo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatError,
    MatDividerModule,
    InputComponent,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './form-veiculo.component.html',
  styleUrl: './form-veiculo.component.scss'
})
export class FormVeiculoComponent {
  private _store = inject(Store);

  public cdListaAlerta = this._store.selectSignal(ListaAlertaSelectors.cdListaAlerta);
  public veiculos = this._store.selectSignal(AlertaSelectors.veiculo);
  public veiculosFiltrados: VeiculoDeteccaoQueryResponse[] = [];
  public veiculoNaoEncontrado: boolean = false;
  public tiposAlertasDrop = () => this._store.select(TipoAlertaSelectors.tiposAlertasSelect)
  public optionsCoresVeiculos = optionsCoresVeiculos

  @Input() formGroup!: FormGroup<FormType<Veiculo>>;
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public route = inject(ActivatedRoute)

  onPlacaInput() {
    this.veiculoNaoEncontrado = false;
    const placa = this.formGroup.get('nrPlaca')?.value;
    this.formGroup.enable()

    this.formGroup.patchValue({
      cdVeiculo: null
    });

    if (placa && placa.length === 7) {
      this.veiculosFiltrados = []
      this.loadVeiculo(placa);
    } else {
      this.veiculosFiltrados = [];
      this.resetForm();
    }
  }

  onVeiculoSelected(event: MatAutocompleteSelectedEvent) {
    const veiculoSelecionado: VeiculoDeteccaoQueryResponse = event.option.value;
    this.formGroup.patchValue(veiculoSelecionado);

    Object.keys(this.formGroup.controls).forEach(controlName => {
      if (controlName !== 'nrPlaca') {
        this.formGroup.get(controlName)?.disable();
      }
    });

    this.veiculosFiltrados = [];
    this.veiculoNaoEncontrado = false;
  }

  loadVeiculo(nrPlaca: string) {
    this._store.dispatch(new BuscarVeiculoPorPlacaAction(nrPlaca)).subscribe(() => {
      const veiculo = this.veiculos()?.data;
      if (veiculo) {
        this.veiculosFiltrados = [veiculo];
        this.veiculoNaoEncontrado = false;
      } else {
        this.veiculosFiltrados = [];
        this.veiculoNaoEncontrado = true;
        this.resetForm()
      }
    });
  }

  resetForm() {
    this.formGroup.patchValue({
      cdVeiculo: null,
      nmModelo: '',
      nmCor: '',
      nmMarca: '',
      nrAno: null,
      nrChassi: '',
      nrRenavam: '',
      endereco: {
        dsLogradouro: '',
        nrEndereco: '',
        dsComplemento: '',
        nmBairro: '',
        nmEstado: '',
        nmCidade: '',
      },
      proprietario: {
        nmProprietario: '',
        nrDocumento: '',
      }
    });
  }
}
