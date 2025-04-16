import { breadcrumbResolver } from "@/presentation/shared/components/resolvers/breadcrumb.resolver";
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
    loadChildren: () => import('./alertas-page/alertas.routes').then(m => m.alertasRoutes),
    resolve: { breadcrumbData: breadcrumbResolver },
    data: {
      breadcrumb: (data: any) => data.breadcrumbData,
    }
  }
]
