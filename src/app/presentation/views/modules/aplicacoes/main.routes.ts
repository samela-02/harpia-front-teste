import { Routes } from "@angular/router";

export const mainRoutes: Routes = [
  {
    path: "",
    redirectTo: "inicio",
    pathMatch: "full"
  },

  {
    path: "inicio",
    loadComponent: () => import("./inicio-page/inicio-page.component").then(m => m.InicioPageComponent),
    data: {
      title: 'Dashboard',
      icon: 'la la-icons'
    }
  },
  {
    path: "eventos-deteccoes",
    loadComponent: () => import("./eventos-deteccoes-page/eventos-deteccoes-page.component").then(m => m.EventosDeteccoesPageComponent),
    data: {
      title: 'Eventos de Detecções',
      icon: 'la la-camera-retro'
    }
  },
];
