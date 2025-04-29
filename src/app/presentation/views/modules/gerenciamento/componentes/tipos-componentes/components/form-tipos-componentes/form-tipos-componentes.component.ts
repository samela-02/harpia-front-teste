import { BuscarTiposComponentesUseCase } from '@/application/usecase/tipo-componente/buscar-tipos-componentes.usecase';
import { CriarTipoComponenteUseCase } from '@/application/usecase/tipo-componente/criar-tipo-componente.usecase';
import { DesativarTipoComponenteUseCase } from '@/application/usecase/tipo-componente/desativar-tipo-componente..usecase';
import { EditarTipoComponenteUseCase } from '@/application/usecase/tipo-componente/editar-tipo-componente.usecase';
import { TiposComponentesFilter, TiposComponentesProps } from '@/domain/filters/tipo-componente/tipo-componente.filter';
import { TipoComponente } from '@/domain/models/command/tipo-componente';
import { BuscarTiposComponentesAction } from '@/infrastructure/store/actions/tipo-componente.actions';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { CustomDialogService, FormType, InputComponent, makeDeleteCustomDialog, SnackbarService } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-tipos-componentes',
  standalone: true,
  imports: [
    InputComponent,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-tipos-componentes.component.html',
  styleUrl: './form-tipos-componentes.component.scss'
})
export class FormTipoComponenteComponent {
  private _snackbar = inject(SnackbarService);
  public formGroup!: FormGroup<FormType<TipoComponente>>;
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() tiposComponentes: any = null;

  constructor(
    private criarTipoComponenteUseCase: CriarTipoComponenteUseCase,
    private editarTipoComponenteUseCase: EditarTipoComponenteUseCase,
    private desativarTipoComponenteUseCase: DesativarTipoComponenteUseCase,
    private formBuilder: FormBuilder,
    private buscarTiposComponentesUseCase: BuscarTiposComponentesUseCase,
  ) {
    this.formGroup = this.formBuilder.group({
      nmTipoComponente: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.updateForm();
    this.updateFormState();
  }

  private updateFormState() {
    if (this.tiposComponentes && !this.isEditable) {
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
    if (this.tiposComponentes) {
      const propsFilter: TiposComponentesProps = {
        page: 0,
        size: 1,
        cdTipoComponente: this.tiposComponentes.cdTipoComponente
      };
      const filter = new TiposComponentesFilter(propsFilter);

      this.buscarTiposComponentesUseCase.execute(filter).subscribe({
        next: (response: any) => {
          if (response.data.dados[0]) {
            this.formGroup.patchValue({
              nmTipoComponente: response.data.dados[0].nmTipoComponente,
            });
          }
        },
        error: () => {
          this._snackbar.error('Erro ao buscar dados do componente');
        }
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as TipoComponente;
      if (this.tiposComponentes?.cdTipoComponente) {
        this.editarTipoComponente(this.tiposComponentes.cdTipoComponente,formData);
      } else {
        this.criarTipoComponente(formData);
      }
    }

  }

  private editarTipoComponente(cdInstituicao: number, formData: TipoComponente) {
    formData.cdTipoComponente = this.tiposComponentes.cdInstituicao;
    this.editarTipoComponenteUseCase.execute(cdInstituicao, formData).subscribe({
      next: () => {
        this._snackbar.success('Tipo de componente atualizado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableTipoComponente()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  criarTipoComponente(formData: TipoComponente) {
    this.criarTipoComponenteUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Tipo de Componente criado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableTipoComponente()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  desativarTipoComponente(tiposComponentes: TipoComponente) {
    this.desativarTipoComponenteUseCase.execute(tiposComponentes.cdTipoComponente).subscribe({
      next: () => {
        this._snackbar.success('Tipo de Componente desativado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableTipoComponente()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeTipoComponente(tiposComponente: TipoComponente) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativar Tipo de Componente",
      value:`o Tipo de componente ${tiposComponente.nmTipoComponente.toLowerCase()}?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarTipoComponente(tiposComponente)
      }
    });
  }

  loadTableTipoComponente() {
    const paginationProps: TiposComponentesProps = {
      page: 0,
    };
    const filter = new TiposComponentesFilter(paginationProps);
    this._store.dispatch(new BuscarTiposComponentesAction(filter)).subscribe(() => {
    })
  }

}
