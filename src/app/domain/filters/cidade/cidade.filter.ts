import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { CidadeProps } from "./cidade.props";
import { CidadeType } from "./cidade.type";
import { PaginatorType } from "@/application/filter-creator/paginator.type";

export class CidadeFilter {
    cidadeProps: CidadeProps

    constructor(cidadeProps: CidadeProps) {
        this.cidadeProps = cidadeProps;
    }

    public getFilters(): FilterManager {
        const filterManager = new HttpFilter([]);

        filterManager.addFilter(new CidadeType.CdCidade(this.cidadeProps.cdCidade));
        filterManager.addFilter(new CidadeType.CdEstado(this.cidadeProps.cdEstado));
        filterManager.addFilter(new CidadeType.IdCidade(this.cidadeProps.idCidade));
        filterManager.addFilter(new CidadeType.NmCidade(this.cidadeProps.nmCidade));
        filterManager.addFilter(new PaginatorType.query(this.cidadeProps.query));
        filterManager.addFilter(new PaginatorType.page(this.cidadeProps.page));
        filterManager.addFilter(new PaginatorType.size(this.cidadeProps.size));
        filterManager.addFilter(new PaginatorType.orderBy(this.cidadeProps.orderBy));

        return filterManager;
    }
}