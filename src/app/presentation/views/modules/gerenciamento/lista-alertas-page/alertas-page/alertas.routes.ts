export const alertasRoutes = [
  {
    path: "",
    loadComponent: () => import('./alertas-page.component').then(m => m.AlertasPageComponent),
  },
  {
    path: "criar-alerta",
    loadComponent: () => import('./components/alerta/page-create-alerta/page-create-alerta.component').then(m => m.ModalFormCreateAlertaComponent),
    data: {
      breadcrumb: 'Cadastrar Alerta'
    }
  }
]