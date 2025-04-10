import { Component, input } from "@angular/core";
import { NoSearchComponent } from "@tivic-team/tivic-ui";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

@Component({
    selector: "no-table",
    standalone: true,
    imports: [NoSearchComponent, NgxSkeletonLoaderModule],
    templateUrl: "./no-table.component.html",
})
export class NoTableComponent {
    dataSource: any = input.required();
    count = input<number>(8);
}
