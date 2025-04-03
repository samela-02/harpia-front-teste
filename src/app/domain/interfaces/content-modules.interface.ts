interface children {
  id: string,
  icon?: string;
  routerLink: string,
  label: string,
  enabled: boolean
}

export interface contentModule {
  label: string;
  icon: string;
  enabled?: boolean;
  routerLink?: string;
  children?: children[]
}