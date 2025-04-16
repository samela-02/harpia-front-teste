import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { MatExpansionModule } from '@angular/material/expansion';
import { environment } from "@env/environment.development";
import { NameFormatterPipe, TimerComponent } from "@tivic-team/tivic-ui";
import { filter } from 'rxjs/operators';
import { RouteData } from "@/domain/interfaces/route-data.interface";
import { Modules } from "@/domain/dtos/modules.dto";
import jsonModules from "../../../../../assets/modules/module.json"
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
    DatePipe,
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
  expiresIn: number;
  timerInterval: any;

  date = new Date();
  version = environment.version;
  currentRouteData: RouteData;

  ngOnInit(): void {
    this.buscaNomeUsuario();
    this.iniciarContadorExpiracao();
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
  }

  iniciarContadorExpiracao() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    const expiresInSeconds = Number(this.authService.getExpiresIn());
    if (!expiresInSeconds) {
      return;
    }

    this.atualizarTempoRestante();

    this.timerInterval = setInterval(() => {
      this.atualizarTempoRestante();
    }, 1000);
  }

  atualizarTempoRestante() {
    const tokenTime = Number(this.authService.getExpiresIn());
    if (!tokenTime) {
      this.expiresIn = 0;
      return;
    }

    const agora = Date.now();
    this.expiresIn = Math.max(0, tokenTime - agora);

    if (this.expiresIn <= 0) {
      clearInterval(this.timerInterval);
      this.deslogarUsuario();
    }
  }

  deslogarUsuario() {
    clearInterval(this.timerInterval);
    this.authService.deslogar();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
