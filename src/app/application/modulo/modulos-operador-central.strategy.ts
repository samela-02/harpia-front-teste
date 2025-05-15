import { ModulosDto } from "@/application/dtos/modulos.dto";
import { ModulosStrategy } from "./modulos.strategy";

export class ModulosOperadorCentralStrategy implements ModulosStrategy {
  definirModulos(): ModulosDto[] {
    const modulos: ModulosDto[] = [
      {
        "name": "Aplicações",
        "label": "Aplicações",
        "enabled": true,
        "routerLink": "/aplicacoes",
        "features": [
          {
            "label": "Dashboard",
            "icon": "la la-icons",
            "routerLink": "/inicio",
            "enabled": true
          },
          {
            "label": "Mapa de Veículos",
            "icon": "la la-map-marked",
            "routerLink": "/mapa-veiculos",
            "enabled": true
          },
          {
            "label": "Eventos de Detecções",
            "icon": "la la-camera-retro",
            "routerLink": "/eventos-deteccoes",
            "enabled": true
          }
        ]
      },
      {
        "name": "Gerenciamento",
        "label": "Gerenciamento",
        "enabled": true,
        "routerLink": "/gerenciamento",
        "features": [
          {
            "label": "Lista de Alertas",
            "icon": "la la-folder-open",
            "routerLink": "/lista-alertas",
            "enabled": true
          },
          {
            "id": "idEquipamentos",
            "label": "Equipamentos",
            "icon": "las la-camera-retro",
            "routerLink": "/equipamentos/lista-equipamentos",
            "enabled": true,
          }
        ]
      }
    ];
    return modulos
  }
}
