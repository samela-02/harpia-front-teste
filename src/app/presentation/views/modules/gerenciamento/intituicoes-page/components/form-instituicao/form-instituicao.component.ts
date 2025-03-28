import { BuscarInstituicoesUseCase } from '@/application/usecase/instituicao/buscar-instituicoes.usecase';
import { CriarInstituicaoUseCase } from '@/application/usecase/instituicao/criar-instituicao.usecase';
import { DesativarInstituicaoUseCase } from '@/application/usecase/instituicao/desativar-instituicao.usecase';
import { EditarInstituicaoUseCase } from '@/application/usecase/instituicao/editar-instituicao.usecase';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao.filter';
import { Instituicao } from '@/domain/models/instituicao';
import { BuscarInstituicoesAction } from '@/infrastructure/store/actions/instituicao.actions';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { CustomDialogService, FormType, InputComponent, makeDeleteCustomDialog, SnackbarService, TextareaComponent } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-instituicao',
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
  templateUrl: './form-instituicao.component.html',
  styleUrl: './form-instituicao.component.scss'
})
export class FormInstituicaoComponent {
  private _snackbar = inject(SnackbarService);
  public formGroup!: FormGroup<FormType<Instituicao>>;
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() instituicao: any = null;

  constructor(
    private criarInstituicaoUseCase: CriarInstituicaoUseCase,
    private editarInstituicaoUseCase: EditarInstituicaoUseCase,
    private desativarInstituicaoUseCase: DesativarInstituicaoUseCase,
    private formBuilder: FormBuilder,
    private buscarInstituicoesUseCase: BuscarInstituicoesUseCase,
  ) {
    this.formGroup = this.formBuilder.group({
      nmInstituicao: ['', [Validators.required]],
      idInstituicao: ['', [Validators.required]],
      txtObservacao: ['']
    });
  }

  ngOnInit(): void {
    this.updateForm();
    this.updateFormState();
  }

  private updateFormState() {
    if (this.instituicao && !this.isEditable) {
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
    if (this.instituicao) {
      const propsFilter: InstituicaoProps = {
        page: 0,
        size: 1,
        cdInstituicao: this.instituicao.cdInstituicao
      };
      const filter = new InstituicaoFilter(propsFilter);

      this.buscarInstituicoesUseCase.execute(filter).subscribe({
        next: (response: any) => {
          if (response.data.dados[0]) {
            this.formGroup.patchValue({
              nmInstituicao: response.data.dados[0].nmInstituicao,
              idInstituicao: response.data.dados[0].idInstituicao,
              txtObservacao: response.data.dados[0].txtObservacao
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
      const formData = this.formGroup.value as Instituicao;
      if (this.instituicao?.cdInstituicao) {
        this.editarInstituicao(this.instituicao.cdInstituicao,formData);
      } else {
        this.criarInstituicao(formData);
      }
    }

  }

  private editarInstituicao(cdInstituicao: number, formData: Instituicao) {
    formData.cdInstituicao = this.instituicao.cdInstituicao;
    this.editarInstituicaoUseCase.execute(cdInstituicao, formData).subscribe({
      next: () => {
        this._snackbar.success('Instituição atualizada com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableInstituicao()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  criarInstituicao(formData: Instituicao) {
    this.criarInstituicaoUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Instituição criada com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableInstituicao()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  desativarInstituicao(instituicao: Instituicao) {
    this.desativarInstituicaoUseCase.execute(instituicao.cdInstituicao).subscribe({
      next: () => {
        this._snackbar.success('Instituição desativada com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableInstituicao()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeInstituicao(instituicao: Instituicao) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativar Instituição",
      value:`a instituição ${instituicao.nmInstituicao.toLowerCase()}?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarInstituicao(instituicao)
        this._snackbar.success("Instituição desativada com sucesso")
        this.loadTableInstituicao()
      }
    });
  }

  loadTableInstituicao() {
    const paginationProps: InstituicaoProps = {
      page: 0,
    };
    const filter = new InstituicaoFilter(paginationProps);
    this._store.dispatch(new BuscarInstituicoesAction(filter)).subscribe(() => {
    })
  }

}
