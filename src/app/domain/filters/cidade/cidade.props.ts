import { PropsFilter } from "@/application/filter-creator/props.filter";

export interface CidadeProps extends PropsFilter {
    cdCidade?: number,
    cdEstado?: number,
    idCidade?: string,
    nmCidade?: string
}