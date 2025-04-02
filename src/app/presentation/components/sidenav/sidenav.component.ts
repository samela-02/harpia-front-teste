import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { MatExpansionModule } from '@angular/material/expansion';
import { environment } from "@env/environment.development";
import { NameFormatterPipe, TimerComponent } from "@tivic-team/tivic-ui";
import { filter } from 'rxjs/operators';
import { RouteData } from "@/domain/interfaces/route-data.interface";
import { Modules } from "@/domain/dtos/modules.dto";
import jsonModules from "../../../../assets/modules/module.json"
import { AuthServiceImpl } from "@/infrastructure/services/auth.service-impl";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"],
    standalone: true,
    imports: [
    MatSidenavModule,
    BreadcrumbComponent,
    MatButtonModule,
    NameFormatterPipe,
    TimerComponent,
    MatExpansionModule,
    AngularLineawesomeModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    CommonModule,
]
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  modules: Modules[] = jsonModules;
  isExpanded = false;
  selectedModule: any = null;
  moduleName: string;
  nomeUsuario: string;

  date = new Date();
  version = environment.version;
  currentRouteData: RouteData;

  ngOnInit(): void {
    this.buscaNomeUsuario()
  }

  constructor(private cdr: ChangeDetectorRef, private router: Router, private authService: AuthServiceImpl,) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.currentRouteData = route.snapshot.data as RouteData;
      console.log(this.currentRouteData)
    });
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  abrirSidenaveEDropdown(module: any) {
    this.selectedModule = module;
    if (!this.isExpanded) {
      this.toggleSidenav();
    }
  }

  buscaNomeUsuario() {
    this.nomeUsuario = this.authService.getNomeUsuario()
    console.log(this.nomeUsuario)
  }

  deslogarUsuario() {
    this.authService.deslogar()
  }
}
