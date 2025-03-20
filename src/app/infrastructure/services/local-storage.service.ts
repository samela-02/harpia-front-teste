import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {
    constructor() { }

    setValue(name: string, value: any): void {
        localStorage.setItem(name, value);
    }

    getValue(name: any): any {
        return localStorage.getItem(name);
    }
}
