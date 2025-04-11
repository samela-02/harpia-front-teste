import { CriarAlertaUseCase } from '@/application/usecase/alerta/criar-alerta.usecase';
import { DesativarAlertaUseCase } from '@/application/usecase/alerta/desativar-alerta..usecase';
import { nvAlertaMap } from '@/domain/enums/tipo-alerta/nv-alerta.enum';
import { AlertaFilter, AlertaProps } from '@/domain/filters/alerta/alerta.filter';
import { Alerta } from '@/domain/models/command/alerta';
import { Veiculo } from '@/domain/models/command/veiculo-deteccao';
import { BuscarAlertaAction, BuscarVeiculoPorPlacaAction } from '@/infrastructure/store/actions/alerta.actions';
import { AlertaSelectors } from '@/infrastructure/store/selectors/alerta.selectors';
import { ListaAlertaSelectors } from '@/infrastructure/store/selectors/lista-alerta.selectors';
import { TipoAlertaSelectors } from '@/infrastructure/store/selectors/tipo-alerta.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { CustomDialogService, DatetimeComponent, DropdownComponent, FormType, InputComponent, makeDeleteCustomDialog, SnackbarService, TextareaComponent } from '@tivic-team/tivic-ui';

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
    AsyncPipe,
    MatInputModule,
    MatAutocompleteModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-alerta.component.html',
  styleUrl: './form-alerta.component.scss'
})
export class FormAlertaComponent {
  private _snackbar = inject(SnackbarService);
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);

  public cdListaAlerta = this._store.selectSignal(ListaAlertaSelectors.cdListaAlerta);
  public veiculos = this._store.selectSignal(AlertaSelectors.veiculo);
  public placaInput = this.formBuilder.control('');
  public veiculosFiltrados: Veiculo[] = [];

  public tiposAlertasDrop = () => this._store.select(TipoAlertaSelectors.tiposAlertasSelect)

  public formGroup!: FormGroup<FormType<Alerta>>;
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public route = inject(ActivatedRoute)

  @Output() cadastroSucesso = new EventEmitter<void>();

  constructor(
    private criarAlertaUseCase: CriarAlertaUseCase,
    private desativarAlertaUseCase: DesativarAlertaUseCase,
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      cdListaAlerta: [this.cdListaAlerta()],
      cdTipoAlerta: [0, [Validators.required]],
      cdVeiculo: [0, [Validators.required]],
      dtAlerta: ['', [Validators.required]],
      dsAlerta: ['', [Validators.required]]
    });

    // Monitorar alterações no campo de placa
    this.placaInput.valueChanges.subscribe(placa => {
      if (placa && placa.length >= 3) {
        this.loadVeiculo(placa);
      }
    });
  }


  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as Alerta;
      this.criarAlerta(formData);
    }

  }

  criarAlerta(formData: Alerta) {
    this.criarAlertaUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Alerta criadO com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableAlerta()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  desativarAlerta(alerta: Alerta) {
    this.desativarAlertaUseCase.execute(alerta.cdListaAlerta).subscribe({
      next: () => {
        this._snackbar.success('alerta desativado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableAlerta()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeAlerta(alerta: Alerta) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativação de alerta",
      value: `o alerta?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarAlerta(alerta)
        this._snackbar.success("Alerta desativado com sucesso")
        this.loadTableAlerta()
      }
    });
  }

  loadTableAlerta() {
    const paginationProps: AlertaProps = {
      page: 0,
      cdListaAlerta: this.cdListaAlerta()
    };
    const filter = new AlertaFilter(paginationProps);
    this._store.dispatch(new BuscarAlertaAction(filter)).subscribe()
  }

  loadVeiculo(nrPlaca: string) {
    this._store.dispatch(new BuscarVeiculoPorPlacaAction(nrPlaca)).subscribe(() => {
      // Após carregar o veículo, verificamos se temos dados válidos
      const veiculo = this.veiculos()?.data;
      if (veiculo) {
        // Adicionamos o veículo encontrado à lista de veículos filtrados
        // Verificamos se já existe na lista para evitar duplicatas
        const existeVeiculo = this.veiculosFiltrados.some(v => v.cdVeiculo === veiculo.cdVeiculo);
        if (!existeVeiculo) {
          this.veiculosFiltrados = [...this.veiculosFiltrados, veiculo];
        }
      }
    });
  }

  selecionarVeiculo(veiculo: Veiculo) {
    // Atualizar o valor do formControl cdVeiculo quando um veículo for selecionado
    this.formGroup.get('cdVeiculo')?.setValue(veiculo.cdVeiculo);
    // Atualizar o input com a placa do veículo selecionado
    this.placaInput.setValue(veiculo.nrPlaca, { emitEvent: false });
  }

  exibirVeiculo(veiculo: Veiculo | null): string {
    return veiculo ? veiculo.nrPlaca : '';
  }

}
