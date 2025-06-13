import { PropsFilter } from "@/application/filter-creator/props.filter";

export interface MotivoRejeicaoProps extends PropsFilter {
    cdMotivoRejeicao?: number;
    dsMotivoRejeicao?: string;
    lgAtivo?: number;
}