import { Routes } from '@angular/router';
import { SidenavComponent } from './presentation/components/sidenav/sidenav.component';
import { AuthGuard } from './infrastructure/guard/auth.guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'aplicacoes',
        loadChildren: () => import('./presentation/views/modules/aplicacoes/main.routes').then(m => m.mainRoutes),
      },
      {
        path: 'gerenciamento',
        loadChildren: () => import('./presentation/views/modules/gerenciamento/gerenciamento.routes').then(i => i.gerenciamentoRoutes)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./presentation/views/modules/login/login-page/login-page.component').then(p => p.LoginPageComponent)
  }
];