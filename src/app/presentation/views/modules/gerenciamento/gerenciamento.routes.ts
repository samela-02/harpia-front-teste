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
      icon: 'la la-industry'
    }
  },
  {
    path: "usuarios",
    loadComponent: () => import('./usuarios-page/usuarios-page.component').then(m => m.UsuariosPageComponent),
    data: {
      title: 'Usuários',
      icon: 'la la-user-friends'
    }
  },
  {
    path: "fontes",
    loadComponent: () => import('./fontes-page/fontes-page.component').then(m => m.FontesPageComponent),
    data: {
      title: 'fontes',
      icon: 'la la-folder-open'
    }
  }
]