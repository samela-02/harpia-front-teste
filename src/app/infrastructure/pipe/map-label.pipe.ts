import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "mapLabel",
    standalone: true, 
})
export class MapLabelPipe implements PipeTransform {
    transform<Enum> (value: Enum, mapLabel: Map<Enum, string>): string {
        return mapLabel.get(value);
    }
}