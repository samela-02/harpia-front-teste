import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonComponent, MODAL_DATA, ModalService } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [ButtonComponent, CommonModule, MatTabsModule, JsonPipe, MatIcon],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.scss',
})
export class ModalContentComponent {

  protected content: any = inject(MODAL_DATA) || null;
  private _modalService = inject(ModalService<ModalContentComponent>)
  fecharModal() {
    this._modalService.dismiss();
  }
}