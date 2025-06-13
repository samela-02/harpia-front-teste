import { FilterManager, HttpFilter } from "@tivic-team/tivic-ui";
import { MotivoRejeicaoProps } from "./motivo-rejeicao.props";
import { MotivoRejeicaoType } from "./motivo-rejeicao.type";

export class MotivoRejeicaoFilter {
    motivoRejeicaoProps: MotivoRejeicaoProps;

    constructor(motivoRejeicaoProps: MotivoRejeicaoProps) {
        this.motivoRejeicaoProps = motivoRejeicaoProps;
    }

    public getFilters(): FilterManager {
        const filterManager = new HttpFilter([]);
        this.adicionarFiltros(filterManager);
        return filterManager;
    }

    private adicionarFiltros(filterManager: HttpFilter) {
        filterManager.addFilter(new MotivoRejeicaoType.CdMotivoRejeicao(this.motivoRejeicaoProps.cdMotivoRejeicao));
        filterManager.addFilter(new MotivoRejeicaoType.DsMotivoRejeicao(this.motivoRejeicaoProps.dsMotivoRejeicao));
        filterManager.addFilter(new MotivoRejeicaoType.LgAtivo(this.motivoRejeicaoProps.lgAtivo));
    }
}