import { Routes } from '@angular/router';

export const instituicoesRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import('./instituicoes-page.component').then(i => i.IntituicoesPageComponent),
    data: {
      title: 'Instituições',
      icon: 'las la-industry'
    }
  }
]