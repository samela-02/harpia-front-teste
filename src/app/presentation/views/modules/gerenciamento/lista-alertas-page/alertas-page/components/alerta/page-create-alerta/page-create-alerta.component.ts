import { CriarAlertaUseCase } from "@/application/usecase/alerta/criar-alerta.usecase";
import { DesativarAlertaUseCase } from "@/application/usecase/alerta/desativar-alerta..usecase";
import { AlertaFilter, AlertaProps } from "@/domain/filters/alerta/alerta.filter";
import { Alerta } from "@/domain/models/command/alerta";
import { ProprietarioVeiculo } from "@/domain/models/command/proprietario-veiculo";
import { Veiculo } from "@/domain/models/command/veiculo-deteccao";
import { BuscarAlertaAction } from "@/infrastructure/store/actions/alerta.actions";
import { ListaAlertaSelectors } from "@/infrastructure/store/selectors/lista-alerta.selectors";
import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { CustomDialogService, FormType, makeDeleteCustomDialog, ModalService, SnackbarService } from "@tivic-team/tivic-ui";
import { FormAlertaComponent } from "../form-alerta/form-alerta.component";
import { FormVeiculoComponent } from "../form-veiculo/form-veiculo.component";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "modal-form-create-alerta",
  standalone: true,
  imports: [
    ...tableImports,
    FormAlertaComponent,
    MatButtonModule,
    FormVeiculoComponent,
    MatStepperModule,
  ],
  styleUrl: "./page-create-alerta.component.scss",
  templateUrl: "./page-create-alerta.component.html",
})
export class ModalFormCreateAlertaComponent {
  // private _modalService = inject(ModalService<ModalFormCreateAlertaComponent>);
  private _store = inject(Store);
  private _snackbar = inject(SnackbarService);
  private _customDialog = inject(CustomDialogService);

  public formGroupAlerta!: FormGroup<FormType<Alerta>>;
  public formGroupVeiculo!: FormGroup<FormType<Veiculo>>;
  public cdListaAlerta = this._store.selectSignal(ListaAlertaSelectors.cdListaAlerta);

  constructor(
    private formBuilder: FormBuilder,
    private criarAlertaUseCase: CriarAlertaUseCase,
    private desativarAlertaUseCase: DesativarAlertaUseCase,
  ){
    this.formGroupAlerta = this.formBuilder.group({
      cdListaAlerta: [this.cdListaAlerta()],
      cdTipoAlerta: [0, [Validators.required]],
      cdVeiculo: [0],
      dtAlerta: ['', [Validators.required]],
      dsAlerta: ['', [Validators.required]]
    });

    this.formGroupVeiculo = this.formBuilder.group({
      nrPlaca: ['', [Validators.required]],
      nmModelo: [''],
      nmCor: [''],
      nmMarca: [''],
      nrAno: [0],
      nrChassi: [''],
      nrRenavam: [''],
      endereco: this.formBuilder.group({
        dsLogradouro: [''],
        nrEndereco: [''],
        dsComplemento: [''],
        nmBairro: [''],
        nmCidade: [''],
        nmEstado: ['']
      }),
      proprietarios: this.formBuilder.array([] as FormGroup<FormType<ProprietarioVeiculo>>[])
    }) as FormGroup<FormType<Veiculo>>;
  }

  onSubmit() {
    if (this.formGroupAlerta.valid) {
      const formData = this.formGroupAlerta.value as Alerta;
      this.criarAlerta(formData);
    }
  }

  criarAlerta(formData: Alerta) {
    this.criarAlertaUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Alerta criadO com sucesso!');
        this.loadTableAlerta()
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

//   fecharModal() {
//     this._modalService.dismiss();
// }

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
