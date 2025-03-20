import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LoaderComponent, ThemeSwitcher } from "@tivic-team/tivic-ui";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  providers: [ThemeSwitcher],
  template: `
        <tvc-loader />
        <router-outlet />
    `,
})
export class AppComponent {
    private _themeSwitcher = inject(ThemeSwitcher);
  constructor() {
    this._themeSwitcher.load();
  }
}
