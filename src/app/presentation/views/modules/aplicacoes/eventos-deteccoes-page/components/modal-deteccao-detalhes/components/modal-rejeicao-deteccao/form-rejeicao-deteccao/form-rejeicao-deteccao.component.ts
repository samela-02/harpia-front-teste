import { MovimentacaoDeteccao } from '@/domain/models/command/movimentacao-deteccao';
import { MotivoRejeicaoQueryResponse } from '@/domain/models/query/motivo-rejeicao-query-response';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownComponent, FormType, InputComponent } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-rejeicao-deteccao',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownComponent, InputComponent],
  templateUrl: './form-rejeicao-deteccao.component.html',
  styleUrl: './form-rejeicao-deteccao.component.scss'
})
export class FormRejeicaoDeteccaoComponent implements OnInit {
  @Input() cdDeteccao: number;
  @Output() rejeitadoComSucesso: EventEmitter<void> = new EventEmitter<void>;
  formGroup: FormGroup<FormType<MovimentacaoDeteccao>>;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      cdDeteccao: [this.cdDeteccao],
      cdMotivoRejeicao: [0, Validators.required],
      dsMovimentacaoDeteccao: ['', Validators.required]
    });
  }
}
