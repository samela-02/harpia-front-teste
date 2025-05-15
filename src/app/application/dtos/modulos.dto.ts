export class ModulosDto {
  name: string;
  label: string;
  enabled: boolean;
  routerLink?: string;
  features: FeatureDto[];
}

class FeatureDto {
  id?: string;
  label: string;
  icon: string;
  routerLink?: string;
  enabled: boolean;
  children?: FeatureDto[];
}
