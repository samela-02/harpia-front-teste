import { BuscarTipoAlertaPeloCdUseCase } from '@/application/usecase/tipo-alerta/buscar-tipo-alerta-pelo-cd.usecase';
import { CriarTipoAlertaUseCase } from '@/application/usecase/tipo-alerta/criar-tipo-alerta.usecase';
import { DesativarTipoAlertaUseCase } from '@/application/usecase/tipo-alerta/desativar-tipo-alerta..usecase';
import { EditarTipoAlertaUseCase } from '@/application/usecase/tipo-alerta/editar-tipo-alerta.usecase';
import { nvAlertaMap } from '@/domain/enums/tipo-alerta/nv-alerta.enum';
import { TipoAlertaFilter, TipoAlertaProps } from '@/domain/filters/tipo-alerta/tipo-alerta.filter';
import { TipoAlerta } from '@/domain/models/command/tipo-alerta';
import { BuscarTiposAlertasAction } from '@/infrastructure/store/actions/tipo-alerta.actions';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { CustomDialogService, DropdownComponent, FormType, InputComponent, makeDeleteCustomDialog, SnackbarService, TextareaComponent } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-tipo-alerta',
  standalone: true,
  imports: [
    TextareaComponent,
    MatButtonModule,
    InputComponent,
    DropdownComponent,
    MatDividerModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-tipo-alerta.component.html',
  styleUrl: './form-tipo-alerta.component.scss'
})
export class FormTipoAlertaComponent {
  private _snackbar = inject(SnackbarService);
  public formGroup!: FormGroup<FormType<TipoAlerta>>;
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);
  protected nvAlertaMap = nvAlertaMap

  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;
  public route = inject(ActivatedRoute)

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() tipoAlerta: any = null;

  constructor(
    private criarTipoAlertaUseCase: CriarTipoAlertaUseCase,
    private editarTipoAlertaUseCase: EditarTipoAlertaUseCase,
    private desativarTipoAlertaUseCase: DesativarTipoAlertaUseCase,
    private formBuilder: FormBuilder,
    private buscarTipoAlertaPorCdUseCase: BuscarTipoAlertaPeloCdUseCase,
  ) {
    this.formGroup = this.formBuilder.group({
      cdListaAlerta: [this.tipoAlerta?.cdListaAlerta],
      nmTipoAlerta: ['', [Validators.required]],
      nvAlerta: [0, [Validators.required]],
      dsTipoAlerta: ['', [Validators.required]]
    });
    // console.log(this.getIdFromUrl())
  }

  ngOnInit(): void {
    this.updateForm();
    this.updateFormState();
    console.log(this.tipoAlerta)
  }

  private updateFormState() {
    if (this.tipoAlerta && !this.isEditable) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
    this.updateFormState();
  }

  private updateForm() {
    if (this.tipoAlerta) {
      this.formGroup.patchValue({
        nmTipoAlerta: this.tipoAlerta.nmTipoAlerta,
        dsTipoAlerta: this.tipoAlerta.dsTipoAlerta,
        nvAlerta: this.tipoAlerta.nvAlerta
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as TipoAlerta;
      if (this.tipoAlerta?.cdTipoAlerta) {
        this.editarTipoAlerta(this.tipoAlerta.cdTipoAlerta,formData);
      } else {
        this.criarTipoAlerta(formData);
      }
    }

  }

  private editarTipoAlerta(cdTipoAlerta: number, formData: TipoAlerta) {
    formData.cdListaAlerta = this.tipoAlerta.cdTipoAlerta;
    this.editarTipoAlertaUseCase.execute(cdTipoAlerta, formData).subscribe({
      next: () => {
        this._snackbar.success('Tipo de alerta atualizada com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableTipoAlerta()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  criarTipoAlerta(formData: TipoAlerta) {
    this.criarTipoAlertaUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Tipo de alerta criada com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableTipoAlerta()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  desativarTipoAlerta(tipoAlerta: TipoAlerta) {
    this.desativarTipoAlertaUseCase.execute(tipoAlerta.cdListaAlerta).subscribe({
      next: () => {
        this._snackbar.success('Tipo de alerta desativada com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableTipoAlerta()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeTipoAlerta(tipoAlerta: TipoAlerta) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativar Tipo de alerta",
      value:`o tipo de alerta ${tipoAlerta.nmTipoAlerta.toLowerCase()}?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarTipoAlerta(tipoAlerta)
        this._snackbar.success("Tipo de alerta desativada com sucesso")
        this.loadTableTipoAlerta()
      }
    });
  }

  loadTableTipoAlerta() {
    const paginationProps: TipoAlertaProps = {
      page: 0,
      cdListaAlerta: this.tipoAlerta?.cdListaAlerta
    };
    console.log('testeee', this.tipoAlerta?.cdListaAlerta)
    const filter = new TipoAlertaFilter(paginationProps);
    this._store.dispatch(new BuscarTiposAlertasAction(filter)).subscribe(() => {
    })
  }

}
