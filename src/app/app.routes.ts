import { Routes } from '@angular/router';
import { SidenavComponent } from './presentation/components/sidenav/sidenav.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'aplicacoes',
    pathMatch: 'full'
  },
  {
    path: 'aplicacoes',
    loadChildren: () => import('./presentation/views/modules/aplicacoes/main.routes').then(m => m.mainRoutes),
    component: SidenavComponent,
  }
];
