export interface IDragAndDropMenusProps {
  description: string;
}

export interface IDragAndDropMenusState {
  menuPanel?: boolean;
  editMenuPanel?: boolean;
  menuName?: string;
  menuUrl?: string;
  editMenuName?: string;
  editMenuUrl?: string;
  editMenuIndex?: string;
  menuItems?: any[];
  errorMsg?: boolean;
  selectedIconKey?: string;
  parentUrl?:boolean;
}