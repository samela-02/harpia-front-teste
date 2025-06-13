import { RejeitarDeteccaoUseCase } from '@/application/usecase/deteccao/rejeitar-deteccao.usecase';
import { MotivoRejeicaoFilter } from '@/domain/filters/motivo-rejeicao/motivo-rejeicao.filter';
import { MotivoRejeicaoProps } from '@/domain/filters/motivo-rejeicao/motivo-rejeicao.props';
import { DeteccaoRejeitada } from '@/domain/models/command/deteccao/deteccao-rejeitada';
import { MotivoRejeicaoQueryResponse } from '@/domain/models/query/motivo-rejeicao-query-response';
import { FindMotivoRejeicaoAction } from '@/infrastructure/store/actions/motivo-rejeicao.actions';
import { MotivoRejeicaoSelector } from '@/infrastructure/store/selectors/motivo-rejeicao.selector';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { DropdownComponent, FormType, InputComponent, SnackbarService } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-rejeicao-deteccao',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownComponent, InputComponent, MatIcon],
  templateUrl: './form-rejeicao-deteccao.component.html',
  styleUrl: './form-rejeicao-deteccao.component.scss'
})
export class FormRejeicaoDeteccaoComponent implements OnInit {
  private _snackbar = inject(SnackbarService);
  private _store = inject(Store);
  @Input() cdDeteccao: number;
  @Output() rejeitadoComSucesso: EventEmitter<void> = new EventEmitter<void>;
  formGroup: FormGroup<FormType<DeteccaoRejeitada>>;

  public motivosRejeicao = () => this._store.select(MotivoRejeicaoSelector.findMotivoRejeicao)

  constructor(private _formBuilder: FormBuilder, private _rejeitarDeteccaoUseCase: RejeitarDeteccaoUseCase) {
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      cdDeteccao: [this.cdDeteccao],
      cdMotivoRejeicao: [0, Validators.required],
      dsMovimentacaoDeteccao: ['', Validators.required]
    });
    this.findCidades();
  }

  findCidades() {
    const paginationProps: MotivoRejeicaoProps = {
          page: 0,
          size: 5000,
          lgAtivo: 1
    };
    const motivoRejeicaoFilter = new MotivoRejeicaoFilter(paginationProps);
    this._store.dispatch(new FindMotivoRejeicaoAction(motivoRejeicaoFilter)).subscribe();
  }

  onSubmit() {
    this._rejeitarDeteccaoUseCase
      .execute(this.formGroup.value as DeteccaoRejeitada)
      .subscribe({
        next: (response) => {
              this._snackbar.success('Detecção rejeitada com sucesso.')
              this.rejeitadoComSucesso.emit();
        },
        error: () => {
          this._snackbar.error('Erro ao rejeitar detecção.')
        }
      });
  }
}
