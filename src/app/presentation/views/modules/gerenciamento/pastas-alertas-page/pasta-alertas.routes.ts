import { breadcrumbResolver } from "@/presentation/components/resolvers/breadcrumb.resolver";
import { Routes } from "@angular/router";

export const pastaAlertasRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import('./pastas-alertas-page.component').then(m => m.PastasAlertasPageComponent),
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