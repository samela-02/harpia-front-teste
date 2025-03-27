import { CriarInstituicaoUseCase } from '@/application/usecase/instituicao/criar-instituicao.usecase';
import { Instituicao } from '@/domain/models/instituicao';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { CustomFormBuilder, FormType, InputComponent, SnackbarService, TextareaComponent } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-instituicao',
  standalone: true,
  imports: [
    MatInput,
    TextareaComponent,
    InputComponent,
    MatFormField,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-instituicao.component.html',
  styleUrl: './form-instituicao.component.scss'
})
export class FormInstituicaoComponent {
  private snackbar = inject(SnackbarService);
  formGroup: FormGroup<FormType<Instituicao>>;
  icon = 'la la-save'

  @Output() cadastroSucesso = new EventEmitter<void>();

  constructor(
    private criarInstituicao: CriarInstituicaoUseCase,
    private formBuilder: FormBuilder
  ){
    this.formGroup = this.formBuilder.group({
      nmInstituicao: ['', [Validators.required]],
      idInstituicao: ['', [Validators.required]],
      txtObservacao: ['']
    })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as Instituicao;
      this.criarInstituicao.execute(formData).subscribe({
        next: () => {
          this.snackbar.success('Instituição criada com sucesso!');
          this.cadastroSucesso.emit();
        },
        error: (error) => {
          this.snackbar.error(error.message);
          console.error(error);
        }
      });
    }
  }
}
