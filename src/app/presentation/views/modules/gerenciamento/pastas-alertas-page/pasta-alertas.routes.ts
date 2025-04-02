import { BreadcrumbSelectors } from "@/infrastructure/store/selectors/breadcrumb.selectors";
import { breadcrumbResolver } from "@/presentation/components/resolvers/breadcrumb.resolver";
import { inject, runInInjectionContext, ApplicationRef } from "@angular/core";
import { Routes } from "@angular/router";
import { Store } from "@ngxs/store";

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