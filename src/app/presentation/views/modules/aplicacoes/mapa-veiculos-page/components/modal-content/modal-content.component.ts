import { CommonModule, JsonPipe } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MODAL_DATA, ModalService } from '@tivic-team/tivic-ui';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [MatTooltipModule, CommonModule, MatTabsModule, MatIcon],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.scss',
})
export class ModalContentComponent {
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  protected content: any = inject(MODAL_DATA) || null;
  private _modalService = inject(ModalService<ModalContentComponent>)
  fecharModal() {
    this._modalService.dismiss();
  }

  public downloadImage() {
    const element = this.imageContainer.nativeElement;

    const filter = (node: Node): boolean => {
      if (!(node instanceof Element)) return true;
      if (node.tagName === 'BUTTON') return false;
      if (node.classList && node.classList.contains('bg-slate-50')) return false;
      if (node.classList && node.classList.contains('action-buttons')) return false;

      return true;
    };

    htmlToImage.toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      filter: filter,
      skipFonts: true
    })
      .then(dataUrl => {
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        const fileName = `deteccao_com_boundbox_${timestamp}.png`;

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Erro ao gerar imagem:', error);
      });
  }
}