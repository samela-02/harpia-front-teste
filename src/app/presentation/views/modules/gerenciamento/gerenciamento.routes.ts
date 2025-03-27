import { Routes } from "@angular/router";

export const gerenciamentoRoutes: Routes = [
  {
    path: "",
    redirectTo: "instituicoes",
    pathMatch: "full"
  },
  {
    path: "instituicoes",
    loadChildren: () => import('./intituicoes-page/instituicoes.routes').then(m => m.instituicoesRoutes)
  }
]