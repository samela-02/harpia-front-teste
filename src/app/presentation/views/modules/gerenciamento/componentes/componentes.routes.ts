import { Routes } from "@angular/router";

export const ComponentesRoutes: Routes = [
  {
    path: "lista-componentes",
    loadComponent: () => import('./lista-componentes/lista-componentes.component').then(m => m.ListaComponentesComponent),
    data: {
      title: 'Lista de Componentes',
      icon: 'la la-microchip',
      breadcrumb: 'Lista de Componentes'
    }
  },
  {
    path: "tipos-componentes",
    loadComponent: () => import('./tipos-componentes/tipos-componentes.component').then(m => m.TiposComponentesComponent),
    data: {
      title: 'Tipos de Componentes',
      icon: 'la la-stream',
      breadcrumb: 'Tipos de Componentes'
    }
  }
]