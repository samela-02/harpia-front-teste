import { CommonModule, isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges
} from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import * as L from 'leaflet';

export interface MarkerData {
    coordinates: [number, number];
    content?: string;
}

export interface PopupAction {
    label: string;
    bgColor?: string;
    showIf?: () => boolean;
    action: (data: any) => void;
}

@Component({
    selector: "map-markers",
    standalone: true,
    imports: [
        CommonModule,
        MatSlideToggleModule,
        MatIconModule,
        MatTooltipModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
    ],
    styleUrl: "./map-markers.component.scss",
    templateUrl: "./map-markers.component.html",
})
export class MapMarkersComponent implements OnChanges, AfterViewInit, OnDestroy {
    @Input() iconUrl?: string;
    @Input() markers: MarkerData[] = [];
    @Input() mapCenter: [number, number] = [-14.8570367, -40.8447884];
    @Input() zoomLevel: number = 13.0;
    @Input() popupActions?: PopupAction[];

    divId: string = "divId";
    openSettings: boolean = false;
    searchQuery: string = "";
    onLoadSearch: boolean = false;
    filteredAddresses: any[] = [];
    searchControl = new FormControl("");
    toggleMarkers: boolean = false;

    @Input() enableFitBounds: boolean = true;

    private map!: L.Map;
    private isMapInitialized = false;

    isFullscreen: boolean = false;
    invalidMarkers: MarkerData[] = [];
    isSearchExpanded = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
    ngOnChanges (changes: SimpleChanges): void {
        if ((changes["mapCenter"] || changes["zoomLevel"]) && this.isMapInitialized && this.map) {
            const isValidCenter = this.mapCenter &&
                this.mapCenter.every(coord => coord !== null && !isNaN(coord));

            if (isValidCenter) {
                this.map.setView(this.mapCenter, this.zoomLevel);
            } else {
              this.mapCenter = [-14.8570367, -40.8447884];
                this.zoomLevel = 4;
                this.map.setView(this.mapCenter, this.zoomLevel);
            }
            this.updateMarkers();
        }
        if (changes["markers"] && this.isMapInitialized && this.map) {
            this.updateMarkers();
        }
    }

    ngAfterViewInit(): void {
        if (!this.isMapInitialized && isPlatformBrowser(this.platformId)) {
            this.initMap();
            this.isMapInitialized = true;
        }
    }

    ngOnDestroy (): void {
        if (this.map) {
            this.map.remove();
        }
    }

    private updateMarkers (): void {
        this.invalidMarkers = [];
        this.markers.forEach(markerData => {
            if (markerData.coordinates && markerData.coordinates.every(coord => coord !== null && !isNaN(coord))) {
                const markerLatLng = L.latLng(markerData.coordinates[0], markerData.coordinates[1]);

                const markerOptions: L.MarkerOptions = {
                    icon: L.icon({
                        iconUrl: this.iconUrl || "",
                        iconSize: [40, 40],
                        iconAnchor: [20, 40],
                        popupAnchor: [0, -40],
                        })
                    };
                    if (this.iconUrl) {
                        const customIcon = L.icon({
                            iconUrl: this.iconUrl,
                            iconSize: [40, 40],
                            iconAnchor: [20, 40],
                            popupAnchor: [0, -40],
                        });
                        markerOptions.icon = customIcon;
                    }

                    const marker = L.marker(markerLatLng, markerOptions);

                    const popupContent = L.DomUtil.create("div");
                    popupContent.innerHTML = markerData.content || "";
                    popupContent.style.fontSize = "14px";
                    popupContent.style.fontWeight = "500";

                    if (this.popupActions && this.popupActions.length > 0) {
                      const buttonContainer = L.DomUtil.create("div", "popup-buttons", popupContent);

                        this.popupActions.forEach(action => {
                          const button = L.DomUtil.create("button", "popup-button", buttonContainer);
                          button.style.backgroundColor = action.bgColor || "#5c7285";
                            button.innerHTML += action.label;
                          L.DomEvent.on(button, "click", (e: any) => {
                                L.DomEvent.stopPropagation(e);
                                action.action(markerData);
                                marker.closePopup();
                            });
                        });
                    }
                    marker.bindPopup(popupContent);
                    marker.addTo(this.map);
            }
        });

    }

    private initMap (): void {
        this.map = L.map("map", {
            center: this.mapCenter,
            zoom: this.zoomLevel,
            layers: [
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "TIVIC"
                })
            ]
        });
        this.updateMarkers();
    }

    getMap(): L.Map {
        return this.map;
    }
}
