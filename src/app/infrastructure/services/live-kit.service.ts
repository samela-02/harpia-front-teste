import { EosResponseDto } from '@/application/dtos/eos/eos-response.dto';
import { Injectable } from '@angular/core';
import {
  LocalParticipant,
  LocalTrackPublication,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  Track,
  VideoPresets,
} from 'livekit-client';

@Injectable()
export class LiveKitService {
  private containerElement?: HTMLElement;
  private currentRoom?: Room;

  realizarStream(eosConfig: EosResponseDto, elementoHtml: HTMLElement): void {
    this.containerElement = elementoHtml;

    const room = new Room({
      adaptiveStream: true,
      dynacast: true,
      videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
      },
    });

    this.currentRoom = room; // Armazenar referência
    this.prepararERealizarConexao(room, eosConfig);
    this.setaEscutadorDeEvento(room);
    console.log(room)
  }

  desconectar(): void {
    if (this.currentRoom) {
      this.currentRoom.disconnect();
      this.currentRoom = undefined;
    }

    if (this.containerElement) {
      this.containerElement.innerHTML = '';
      this.containerElement = undefined;
    }
  }

  private prepararERealizarConexao(room: Room, eosConfig: EosResponseDto) {
    console.log('conf',eosConfig)
    room.prepareConnection(eosConfig.config.livekitWsUrl, eosConfig.connectionMetadata.token);
    room.connect(eosConfig.config.livekitWsUrl, eosConfig.connectionMetadata.token);
  }

  private setaEscutadorDeEvento(room: Room) {
    room
      .on(RoomEvent.TrackSubscribed, this.lidarComInscricaoTracker.bind(this))
      .on(RoomEvent.TrackUnsubscribed, this.lidarComDesinscricaoTracker.bind(this))
      .on(RoomEvent.Connected, () => {
        console.log('Conectado à sala');
      })
      .on(RoomEvent.Disconnected, () => {
        console.log('Desconectado da sala');
      })
      .on(RoomEvent.ConnectionStateChanged, (state) => {
        console.log('Estado da conexão:', state);
      });
  }

  private lidarComInscricaoTracker(
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant
  ) {
    if (track.kind === Track.Kind.Video) {
      const videoElement = track.attach() as HTMLVideoElement;

      if (this.containerElement) {
      const existingVideos = this.containerElement.querySelectorAll('video');
      existingVideos.forEach(video => video.remove());

      videoElement.style.width = '100%';
      videoElement.style.height = '100%';
      videoElement.style.objectFit = 'cover';
      videoElement.style.display = 'block';
      videoElement.autoplay = true;
      videoElement.playsInline = true;
      videoElement.muted = false;

      this.containerElement.appendChild(videoElement);
      }
    }

    if (track.kind === Track.Kind.Audio) {
      const audioElement = track.attach() as HTMLAudioElement;
      audioElement.autoplay = true;

      if (this.containerElement) {
        this.containerElement.appendChild(audioElement);
      }
    }
  }


  private lidarComDesinscricaoTracker(
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) {
    track.detach();
  }
}
