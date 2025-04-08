import { breadcrumbResolver } from "@/presentation/components/resolvers/breadcrumb.resolver";
import { Routes } from "@angular/router";

export const listaAlertasRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import('./lista-alertas-page.component').then(m => m.ListaAlertasPageComponent),
    data: {
      title: 'Alertas',
    }
  },
  {
    path: ":cdAlerta",
    loadComponent: () => import('./alertas-page/alertas-page.component').then(m => m.AlertasPageComponent),
    resolve: {breadcrumbData: breadcrumbResolver},
    data: {
      breadcrumb: (data: any) => data.breadcrumbData,
    }
  }
]