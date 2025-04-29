import { BreadcrumbSelectors } from "@/infrastructure/store/selectors/breadcrumb.selectors";
import { ApplicationRef, inject, runInInjectionContext } from "@angular/core";
import { Store } from "@ngxs/store";

export const breadcrumbResolver = () => {
  const appRef = inject(ApplicationRef);
  return runInInjectionContext(appRef.injector, () => {
    const store = inject(Store);
    return store.select(BreadcrumbSelectors.breadcrumb);
  })
}