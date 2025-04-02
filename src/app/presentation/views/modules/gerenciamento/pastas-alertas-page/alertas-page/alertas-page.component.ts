import { SetarBreadcrumbAction } from '@/infrastructure/store/actions/breadcrumb.action';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-alertas-page',
  standalone: true,
  imports: [],
  templateUrl: './alertas-page.component.html',
  styleUrl: './alertas-page.component.scss'
})
export class AlertasPageComponent implements OnInit {
  private _store = inject(Store);
  private _cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this._store.dispatch(new SetarBreadcrumbAction('wcecyytwe'))
      .subscribe(() => {
        this._cdr.detectChanges();
      });
  }
}
