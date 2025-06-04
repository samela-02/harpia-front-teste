export interface MapLayer {
  url: string;
  label: string;
  subdomains?: string;
}

export const MapLayers: Record<string, MapLayer> = {
  NORMAL: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    subdomains: 'abcd',
    label: "Normal"
  },
  SATELLITE: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
    subdomains: 'abcd',
    label: "Satélite"
  },
  DARK: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    subdomains: 'abcd',
    label: "Escuro"
  }
} as const;

export type MapLayerType = keyof typeof MapLayers;
