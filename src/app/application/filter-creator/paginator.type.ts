import { Filter } from "@tivic-team/tivic-ui";

export namespace PaginatorType {
    export class page extends Filter<number> {
        constructor (value: number) {
            super("page", value);
        }

        validate (): boolean {
            if (this.value < 0 || this.value === undefined) return false;
            return true;
        }
    }

    export class size extends Filter<number> {
        constructor (value: number) {
            super("size", value);
        }

        validate (): boolean {
            if (this.value <= 1 || this.value === undefined) return false;
            return true;
        }
    }

    export class query extends Filter<string> {
        constructor (value: string) {
            super("query", value);
        }

        validate (): boolean {
            return !!this.value;
        }
    }

    export class orderBy extends Filter<string> {
        constructor (value: string) {
            super("orderBy", value);
        }

        validate (): boolean {
            return !!this.value;
        }
    }
}