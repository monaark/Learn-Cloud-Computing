export type ThemeMode = 'dark' | 'light';

export type CategoryKey = 
  | 'all'
  | 'characteristics'
  | 'deployment'
  | 'services'
  | 'infrastructure'
  | 'providers'
  | 'security';

export interface ConceptSubItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  isAdded?: boolean;
  examples?: string[];
  keyTakeaways?: string[];
  architecturalImpact?: string;
}

export interface ConceptPillar {
  id: CategoryKey;
  title: string;
  iconName: string;
  description: string;
  badgeText: string;
  isAddedPillar?: boolean;
  subItems: ConceptSubItem[];
}

export interface SharedResponsibilityItem {
  layer: string;
  description: string;
  iaas: 'customer' | 'provider' | 'shared';
  paas: 'customer' | 'provider' | 'shared';
  saas: 'customer' | 'provider' | 'shared';
  faas: 'customer' | 'provider' | 'shared';
}
