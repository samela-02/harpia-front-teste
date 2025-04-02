import { Routes } from "@angular/router";

export const gerenciamentoRoutes: Routes = [
  {
    path: "",
    redirectTo: "instituicoes",
    pathMatch: "full"
  },
  {
    path: "instituicoes",
    loadComponent: () => import('./intituicoes-page/instituicoes-page.component').then(m => m.IntituicoesPageComponent),
    data: {
      title: 'Instituições',
      icon: 'la la-industry',
      breadcrumb: 'Instituições'
    }
  },
  {
    path: "usuarios",
    loadComponent: () => import('./usuarios-page/usuarios-page.component').then(m => m.UsuariosPageComponent),
    data: {
      title: 'Usuários',
      icon: 'la la-user-friends',
      breadcrumb: 'Usuários'
    }
  },
  {
    path: "pastas-alertas",
    loadChildren: () => import('./pastas-alertas-page/pasta-alertas.routes').then(p => p.pastaAlertasRoutes),
    data: {
      title: 'Pastas de Alertas',
      icon: 'la la-folder-open',
      breadcrumb: 'Pastas de Alertas'
    }
  }
]