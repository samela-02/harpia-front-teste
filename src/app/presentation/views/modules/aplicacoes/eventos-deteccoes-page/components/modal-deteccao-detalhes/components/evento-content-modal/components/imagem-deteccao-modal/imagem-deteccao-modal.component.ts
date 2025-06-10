import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { MODAL_DATA, ModalService } from '@/infrastructure/services/modal/modal.service';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-imagem-deteccao-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatSlideToggleModule],
  templateUrl: './imagem-deteccao-modal.component.html',
  styleUrl: './imagem-deteccao-modal.component.scss',
})
export class ImagemDeteccaoModalComponent {
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  public openConfig: boolean = false;
  public exibeBoundBox: boolean = true;

  protected deteccao: DeteccaoQueryResponse = inject(MODAL_DATA) as DeteccaoQueryResponse;
  private _modalService = inject(ModalService<ImagemDeteccaoModalComponent>)
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

  public onToggleChange(event: MatSlideToggleChange) {
    const intendedState = event.checked;
    const toggle = event.source;
    if (intendedState) {
      this.exibeBoundBox = true
    } else {
      this.exibeBoundBox = false
    }
    toggle.checked = !intendedState;
  }
}
