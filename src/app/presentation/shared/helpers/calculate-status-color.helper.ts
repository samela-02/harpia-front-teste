import { colorStatus } from "@/presentation/enums/color-status.enum";

export class DefineColorStatus {
  static defineColorByTime(lastCommunicationTime: Date): colorStatus{
    const now = new Date();
    lastCommunicationTime = new Date(lastCommunicationTime)
    const diffMinutes = (now.getTime() - lastCommunicationTime.getTime()) / (1000 * 60);

    if (diffMinutes < 10) {
      return colorStatus.Verde;
    }
    if (diffMinutes < 60) {
      return colorStatus.Amarelo;
    }
    if (diffMinutes < 1440) {
      return colorStatus.Vermelho;
    }
    return colorStatus.Cinza
  }
}
