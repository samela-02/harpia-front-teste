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
import { TimerComponent } from "@tivic-team/tivic-ui";
import { filter } from 'rxjs/operators';
import { RouteData } from "@/domain/interface/route-data.interface";
import { Modules } from "@/domain/dto/modules.dto";
import jsonModules from "../../../../assets/modules/module.json"

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"],
    standalone: true,
    imports: [
      MatSidenavModule,
      MatButtonModule,
      TimerComponent,
      MatExpansionModule,
      AngularLineawesomeModule,
      RouterModule,
      MatListModule,
      MatIconModule,
      CommonModule
    ]
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  modules: Modules[] = jsonModules;
  isExpanded = false;
  selectedModule: any = null;
  moduleName: string;

  date = new Date();
  version = environment.version;
  currentRouteData: RouteData;

  constructor(private cdr: ChangeDetectorRef, private router: Router) {
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
}
