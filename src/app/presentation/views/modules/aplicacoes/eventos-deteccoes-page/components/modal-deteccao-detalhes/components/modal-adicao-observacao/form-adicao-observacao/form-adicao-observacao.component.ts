import { AdicionarObservacaoDeteccaoUseCase } from '@/application/usecase/deteccao/adicionar-observacao-deteccao.usecase';
import { ObservacaoDeteccao } from '@/domain/models/command/deteccao/observacao-deteccao';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormType, SnackbarService, TextareaComponent } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-adicao-observacao',
  standalone: true,
  imports: [ReactiveFormsModule ,TextareaComponent],
  templateUrl: './form-adicao-observacao.component.html',
  styleUrl: './form-adicao-observacao.component.scss'
})
export class FormAdicaoObservacaoComponent implements OnInit {
  @Output() sucessoAdicao: EventEmitter<void> = new EventEmitter<void>;
  @Input() cdDeteccao: number;
  formGroup: FormGroup<FormType<ObservacaoDeteccao>>;
  private _snackbar = inject(SnackbarService);

  constructor(private _formBuilder: FormBuilder, private _adicionarObservacaoUseCase: AdicionarObservacaoDeteccaoUseCase) {
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      cdDeteccao: [this.cdDeteccao],
      dsMovimentacaoDeteccao: ['', Validators.required]
    })
  }

  onSubmit(): void {
    console.log(this.cdDeteccao)
    this._adicionarObservacaoUseCase
      .execute(this.formGroup.value as ObservacaoDeteccao)
      .subscribe({
        next: (response) => {
          this._snackbar.success('Observação adicionada com sucesso.');
          this.sucessoAdicao.emit();
        },
        error: () => {
          this._snackbar.error('Erro ao adicioanr observação.');
        }
      })
  }
}
