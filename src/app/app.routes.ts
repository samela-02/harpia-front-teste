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
    path: 'aplicacoes',
    loadChildren: () => import('./presentation/views/modules/aplicacoes/main.routes').then(m => m.mainRoutes),
    component: SidenavComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./presentation/views/modules/login/login-page/login-page.component').then(p => p.LoginPageComponent)
  }
];