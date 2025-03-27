import { BuscarInstituicoesUseCase } from '@/application/usecase/instituicao/buscar-instituicoes.usecase';
import { CriarInstituicaoUseCase } from '@/application/usecase/instituicao/criar-instituicao.usecase';
import { EditarInstituicaoUseCase } from '@/application/usecase/instituicao/editar-instituicao.usecase';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao.filter';
import { Instituicao } from '@/domain/models/instituicao';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormType, InputComponent, SnackbarService, TextareaComponent } from '@tivic-team/tivic-ui';

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
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() cdInstituicao: any = null;

  constructor(
    private criarInstituicaoUseCase: CriarInstituicaoUseCase,
    private editarInstituicaoUseCase: EditarInstituicaoUseCase,
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
    if (this.cdInstituicao && !this.isEditable) {
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
    console.log(this.cdInstituicao)
    if (this.cdInstituicao) {
      const propsFilter: InstituicaoProps = {
        page: 0,
        size: 1,
        cdInstituicao: this.cdInstituicao
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
      if (this.cdInstituicao) {
        this.editarInstituicao(this.cdInstituicao,formData);
      } else {
        this.criarInstituicao(formData);
      }
    }

  }


  private editarInstituicao(cdInstituicao: number, formData: Instituicao) {
    formData.cdInstituicao = this.cdInstituicao;
    this.editarInstituicaoUseCase.execute(cdInstituicao, formData).subscribe({
      next: () => {
        this._snackbar.success('Instituição atualizada com sucesso!');
        this.cadastroSucesso.emit();
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
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

}
