export interface MapLayer {
  url: string;
  label: string;
}

export const MapLayers: Record<string, MapLayer> = {
  NORMAL: {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    label: "Normal"
  },
  SATELLITE: {
    url: "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png",
    label: "Satélite"
  },
  DARK: {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    label: "Escuro"
  }
} as const;

export type MapLayerType = keyof typeof MapLayers;