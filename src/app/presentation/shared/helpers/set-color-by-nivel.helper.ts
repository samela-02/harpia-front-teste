export class SetColorByNivel {
  static setColor(nivel:number){
    if(nivel == 1) {
      return "#00CC22";
    } else if(nivel == 2) {
      return "#AAff00";
    } else if(nivel == 3) {
      return "#FFCC00";
    } else if(nivel == 4) {
      return "#FF8800";
    } else if(nivel == 5) {
      return "#d90000";
    } else {
      return "#9E9E9E";
    }
  }
}