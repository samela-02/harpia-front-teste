import { BuscarTiposEquipamentosUseCase } from '@/application/usecase/tipo-equipamento/buscar-tipos-equipamentos.usecase';
import { CriarTipoEquipamentoUseCase } from '@/application/usecase/tipo-equipamento/criar-tipo-equipamento.usecase';
import { DesativarTipoEquipamentoUseCase } from '@/application/usecase/tipo-equipamento/desativar-tipo-equipamento..usecase';
import { EditarTipoEquipamentoUseCase } from '@/application/usecase/tipo-equipamento/editar-tipo-equipamento.usecase';
import { TipoEquipamentosFilter, TipoEquipamentosProps } from '@/domain/filters/lista-equipamento/tipo-equipamento.filter';
import { TipoEquipamento } from '@/domain/models/tipo-equipamento';
import { BuscarTiposEquipamentosAction } from '@/infrastructure/store/actions/tipo-equipamento.actions';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { CustomDialogService, FormType, InputComponent, makeDeleteCustomDialog, SnackbarService, TextareaComponent } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-tipos-equipamentos',
  standalone: true,
  imports: [
    TextareaComponent,
    InputComponent,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-tipos-equipamentos.component.html',
  styleUrl: './form-tipos-equipamentos.component.scss'
})
export class FormTipoEquipamentoComponent {
  private _snackbar = inject(SnackbarService);
  public formGroup!: FormGroup<FormType<TipoEquipamento>>;
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() tiposEquipamentos: any = null;

  constructor(
    private criarTipoEquipamentoUseCase: CriarTipoEquipamentoUseCase,
    private editarTipoEquipamentoUseCase: EditarTipoEquipamentoUseCase,
    private desativarTipoEquipamentoUseCase: DesativarTipoEquipamentoUseCase,
    private formBuilder: FormBuilder,
    private buscarTiposEquipamentosUseCase: BuscarTiposEquipamentosUseCase,
  ) {
    this.formGroup = this.formBuilder.group({
      nmTipoEquipamento: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.updateForm();
    this.updateFormState();
  }

  private updateFormState() {
    if (this.tiposEquipamentos && !this.isEditable) {
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
    console.log('aquii', this.tiposEquipamentos)
    if (this.tiposEquipamentos) {
      const propsFilter: TipoEquipamentosProps = {
        page: 0,
        size: 1,
        cdTipoEquipamento: this.tiposEquipamentos.cdTipoEquipamento
      };
      const filter = new TipoEquipamentosFilter(propsFilter);

      this.buscarTiposEquipamentosUseCase.execute(filter).subscribe({
        next: (response: any) => {
          if (response.data.dados[0]) {
            console.log('tetsto',response.data.dados[0])
            this.formGroup.patchValue({
              nmTipoEquipamento: response.data.dados[0].nmTipoEquipamento,
            });
          }
        },
        error: (error) => {
          console.error('Error fetching institution:', error);
          this._snackbar.error('Erro ao buscar dados da instituição');
        }
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as TipoEquipamento;
      if (this.tiposEquipamentos?.cdTipoEquipamento) {
        this.editarTipoEquipamento(this.tiposEquipamentos.cdTipoEquipamento,formData);
      } else {
        this.criarTipoEquipamento(formData);
      }
    }

  }

  private editarTipoEquipamento(cdInstituicao: number, formData: TipoEquipamento) {
    formData.cdTipoEquipamento = this.tiposEquipamentos.cdInstituicao;
    this.editarTipoEquipamentoUseCase.execute(cdInstituicao, formData).subscribe({
      next: () => {
        this._snackbar.success('Tipo de equipamento atualizado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableTipoEquipamento()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  criarTipoEquipamento(formData: TipoEquipamento) {
    this.criarTipoEquipamentoUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Tipo de Equipamento criado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableTipoEquipamento()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  desativarTipoEquipamento(tiposEquipamentos: TipoEquipamento) {
    this.desativarTipoEquipamentoUseCase.execute(tiposEquipamentos.cdTipoEquipamento).subscribe({
      next: () => {
        this._snackbar.success('Tipo de Equipamento desativado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableTipoEquipamento()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeTipoEquipamento(tiposEquipamento: TipoEquipamento) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativar Tipo de Equipamento",
      value:`o Tipo de equipamento ${tiposEquipamento.nmTipoEquipamento.toLowerCase()}?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarTipoEquipamento(tiposEquipamento)
      }
    });
  }

  loadTableTipoEquipamento() {
    const paginationProps: TipoEquipamentosProps = {
      page: 0,
    };
    const filter = new TipoEquipamentosFilter(paginationProps);
    this._store.dispatch(new BuscarTiposEquipamentosAction(filter)).subscribe(() => {
    })
  }

}
