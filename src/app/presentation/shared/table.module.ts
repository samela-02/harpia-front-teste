import { MapLabelPipe } from "@/infrastructure/pipe/map-label.pipe";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { MatIconButton } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { BadgeComponent, ButtonComponent, ChipsComponent, NoSearchComponent } from "@tivic-team/tivic-ui";

export const tableModule = [
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    DatePipe,
    CurrencyPipe,
    MatIconButton,
    MatIconModule,
    MatSortModule,
    MatChipsModule,
    MapLabelPipe,

    /**
     * LIB @name tivic-team
     */
    NoSearchComponent,
    BadgeComponent,
    ButtonComponent,
    ChipsComponent,
];
