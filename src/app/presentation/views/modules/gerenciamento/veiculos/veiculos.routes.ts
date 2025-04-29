import { Routes } from "@angular/router";

export const VeiculosRoutes: Routes = [
  {
    path: "veiculos-cco",
    loadComponent: () => import('./veiculos-cco-page/veiculos-cco-page.component').then(m => m.VeiculosCcoPageComponent),
    data: {
      title: 'Veículos CCO',
      icon: 'la la-car-alt',
      breadcrumb: 'Veículos CCO'
    }
  },
  // {
  //   path: "tipos-equipamentos",
  //   loadComponent: () => import('./tipos-equipamentos/tipos-equipamentos.component').then(m => m.TiposEquipamentosComponent),
  //   data: {
  //     title: 'Tipos de Equipamentos',
  //     icon: 'la la-stream',
  //     breadcrumb: 'Tipos de Equipamentos'
  //   }
  // }
]