import { signal } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";

export abstract class TablePageBase {
    protected formGroup: FormGroup = new FormGroup({});
    protected pageSize: number = 15;
    protected pageIndex: number = 0;
    protected sort: string = '';
    protected pageSizeOptions = signal<number[]>([5, 10, 15, 25, 50]);
    abstract load(index: number): void;

    protected onPageChange (page: PageEvent) {
        this.pageSize = page.pageSize;
        this.pageIndex = page.pageIndex;
        this.load(this.pageIndex + 1);
    }

    protected onSortChange (sort: Sort) {
        this.sort = `${sort.active},${sort.direction.toUpperCase()},ignorecase`;
        this.load(this.pageIndex);
    }

    protected filterParamsAdapter (page: number, formGroup: FormGroup) {
        return {
            size: this.pageSize,
            page,
            sort: this.sort,
            ...formGroup.value
        };
    }
}
