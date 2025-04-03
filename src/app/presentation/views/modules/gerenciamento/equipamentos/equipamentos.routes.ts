import { Routes } from "@angular/router";

export const EquipamentosRoutes: Routes = [
  {
    path: "lista-equipamentos",
    loadComponent: () => import('./lista-equipamentos/lista-equipamentos.component').then(m => m.ListaEquipamentosComponent),
    data: {
      title: 'Lista de Equipamentos',
      icon: 'la la-camera-retro',
      breadcrumb: 'Lista de Equipamentos'
    }
  },
  {
    path: "tipos-equipamentos",
    loadComponent: () => import('./tipos-equipamentos/tipos-equipamentos.component').then(m => m.TiposEquipamentosComponent),
    data: {
      title: 'Tipos de Equipamentos',
      icon: 'la la-stream',
      breadcrumb: 'Tipos de Equipamentos'
    }
  }
]