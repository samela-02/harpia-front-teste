import { CriarAlertaUseCase } from "@/application/usecase/alerta/criar-alerta.usecase";
import { DesativarAlertaUseCase } from "@/application/usecase/alerta/desativar-alerta..usecase";
import { AlertaFilter, AlertaProps } from "@/domain/filters/alerta/alerta.filter";
import { Alerta } from "@/domain/models/command/alerta";
import { Veiculo } from "@/domain/models/command/veiculo-deteccao";
import { BuscarAlertaAction } from "@/infrastructure/store/actions/alerta.actions";
import { ListaAlertaSelectors } from "@/infrastructure/store/selectors/lista-alerta.selectors";
import { HeaderEtapaComponent } from "@/presentation/shared/components/header-etapa/header-etapa.component";
import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { Store } from "@ngxs/store";
import { CustomDialogService, FormType, makeDeleteCustomDialog, SnackbarService } from "@tivic-team/tivic-ui";
import { FormAlertaComponent } from "../form-alerta/form-alerta.component";
import { FormVeiculoComponent } from "../form-veiculo/form-veiculo.component";
import { CriarVeiculoUseCase } from "@/application/usecase/alerta/criar-veiculo.usecase";
import { TipoAlertaFilter, TipoAlertaProps } from "@/domain/filters/tipo-alerta/tipo-alerta.filter";
import { BuscarTiposAlertasAction } from "@/infrastructure/store/actions/tipo-alerta.actions";
import { Router } from "@angular/router";
@Component({
  selector: "modal-form-create-alerta",
  standalone: true,
  imports: [
    ...tableImports,
    MatExpansionModule,
    HeaderEtapaComponent,
    MatButtonModule,
    FormAlertaComponent,
    FormVeiculoComponent,
  ],
  styleUrl: "./page-create-alerta.component.scss",
  templateUrl: "./page-create-alerta.component.html",
})
export class ModalFormCreateAlertaComponent {
  private _store = inject(Store);
  private _snackbar = inject(SnackbarService);
  private _customDialog = inject(CustomDialogService);
  private _router = inject(Router)

  public formGroupAlerta!: FormGroup<FormType<Alerta>>;
  public formGroupVeiculo!: FormGroup<FormType<Veiculo>>;
  public cdListaAlerta = this._store.selectSignal(ListaAlertaSelectors.cdListaAlerta);

  constructor(
    private formBuilder: FormBuilder,
    private criarVeiculoUseCase: CriarVeiculoUseCase,
    private criarAlertaUseCase: CriarAlertaUseCase,
    private desativarAlertaUseCase: DesativarAlertaUseCase,
  ){
    this.loadTiposDeAlertas()
    this.formGroupAlerta = this.formBuilder.group({
      cdListaAlerta: [this.cdListaAlerta()],
      cdTipoAlerta: [0, [Validators.required]],
      cdVeiculo: [0],
      dtAlerta: ['', [Validators.required]],
      dsAlerta: ['', [Validators.required]]
    });

    this.formGroupVeiculo = this.formBuilder.group({
      cdVeiculo: [],
      nrPlaca: ['', [Validators.required]],
      nmModelo: [''],
      nmCor: [''],
      nmMarca: [''],
      nrAno: [],
      nrChassi: ['', Validators.pattern("^(?=.*[A-HJ-NPR-Z])(?=.*[0-9])[A-HJ-NPR-Z0-9]{17}$")],
      nrRenavam: ['', Validators.pattern("^\d{11}$")],
      endereco: this.formBuilder.group({
        dsLogradouro: [''],
        nrEndereco: [''],
        dsComplemento: [''],
        nmBairro: [''],
        nmCidade: [''],
        nmEstado: ['']
      }),
      proprietario: this.formBuilder.group({
        nmProprietario: [''],
        nrDocumento: ['']
      })
    }) as FormGroup<FormType<Veiculo>>
  }

  onSubmit() {
    if (this.formGroupAlerta.valid && this.formGroupVeiculo) {
      const formDataAlerta = this.formGroupAlerta.value as Alerta;

      const formDataVeiculo = this.formGroupVeiculo.getRawValue() as Veiculo;

      if (formDataVeiculo.cdVeiculo) {
        formDataAlerta.cdVeiculo = formDataVeiculo.cdVeiculo;
        this.criarAlerta(formDataAlerta);
      } else if (formDataVeiculo.cdVeiculo == null) {
        this.criarVeiculoComAlerta(formDataVeiculo, formDataAlerta);
      }
    }
  }

  criarVeiculoComAlerta(formDataVeiculo: Veiculo, formDataAlerta: Alerta) {
    this.criarVeiculoUseCase.execute(formDataVeiculo).subscribe({
      next: (response: any) => {
        const cdVeiculo = response.data.cdVeiculo;
        formDataAlerta.cdVeiculo = cdVeiculo;
        this.criarAlerta(formDataAlerta);
      },
      error: (error) => {
        this._snackbar.error('Erro ao criar veículo: ' + error.message);
      }
    });
  }

  criarAlerta(formData: Alerta) {
    this.criarAlertaUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Alerta criado com sucesso!');
        this.loadTableAlerta()
        this._router.navigate([`/gerenciamento/lista-alertas/${this.cdListaAlerta()}`])
      },
      error: (error) => {
        this._snackbar.error(error.message);
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

  loadTiposDeAlertas() {
    const paginationProps: TipoAlertaProps = {
      page: 0,
      size: 100
    };
    const filter = new TipoAlertaFilter(paginationProps);
    this._store.dispatch(new BuscarTiposAlertasAction(filter)).subscribe()
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

  desativarAlerta(alerta: Alerta) {
    this.desativarAlertaUseCase.execute(alerta.cdListaAlerta).subscribe({
      next: () => {
        this._snackbar.success('alerta desativado com sucesso!');
        this.loadTableAlerta()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }
}
