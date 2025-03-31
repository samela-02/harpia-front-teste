import { signal } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";

export abstract class TablePageBase {
    protected pageSize: number = 10;
    protected pageIndex: number = 0;
    public currentFilters?: any

  abstract load(filter: any, index: number): void;

  protected onPageChange(page: PageEvent) {
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex;
    this.load(this.currentFilters, this.pageIndex);
  }

    protected filterParamsAdapter (page: number, formGroup: FormGroup) {
        return {
            size: this.pageSize,
            page,
            ...formGroup.value
        };
    }
}
