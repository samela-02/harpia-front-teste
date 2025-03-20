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
];
