import { EosResponseDto } from '@/application/dtos/eos/eos-response.dto';
import { LiveKitService } from '@/infrastructure/services/live-kit.service';
import { MODAL_DATA, ModalService } from '@/infrastructure/services/modal/modal.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-modal-livekit',
  standalone: true,
  imports: [MatTooltipModule, CommonModule],
  providers: [LiveKitService],
  templateUrl: './modal-livekit.component.html',
  styleUrl: './modal-livekit.component.scss'
})
export class ModalLivekitComponent implements AfterViewInit {
  @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef<HTMLDivElement>;

  protected content: EosResponseDto = inject(MODAL_DATA) as EosResponseDto;
  private _modalService = inject(ModalService<ModalLivekitComponent>)
  private _liveKitService = inject(LiveKitService);

  public downloadImage() {
    const element = this.videoContainer.nativeElement;
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
          const fileName = `stream_${timestamp}.png`;
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

  ngAfterViewInit() {
    this.iniciarVisualizacao(this.content);
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  iniciarVisualizacao(eosConfig: EosResponseDto) {
    console.log(eosConfig)
    this._liveKitService.realizarStream(eosConfig, this.videoContainer.nativeElement);
  }
}
