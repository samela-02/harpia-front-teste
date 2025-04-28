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
    path: "lista-alertas",
    loadChildren: () => import('./lista-alertas-page/lista-alertas.routes').then(p => p.listaAlertasRoutes),
    data: {
      title: 'Lista de Alertas',
      icon: 'la la-folder-open',
      breadcrumb: 'Lista de Alertas'
    }
  },
  {
    path: "equipamentos",
    loadChildren: () => import('./equipamentos/equipamentos.routes').then(e => e.EquipamentosRoutes),
  },
  {
    path: "veiculos",
    loadChildren: () => import('./veiculos/veiculos.routes').then(v => v.VeiculosRoutes)
  },
  {
    path: "componentes",
    loadChildren: () => import('./componentes/componentes.routes').then(e => e.ComponentesRoutes),
  }
]