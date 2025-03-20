import { Filter } from "@tivic-team/tivic-ui";

export class SearchFilter extends Filter<string> {
    constructor (value: string) {
        super("search", value);
    }
    
    validate (): boolean {
        if (this.value === "" || !this.value) return false;
        return true;
    }
}