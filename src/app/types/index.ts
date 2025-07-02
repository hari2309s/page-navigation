export interface PageItem {
  id: string;
  label: string;
  isActive?: boolean;
  icon?: React.ReactNode;
}

export interface ContextMenuOption {
  icon: React.ReactNode;
  label: string;
  color: string;
}

export interface ContextMenuPosition {
  top: number;
  left: number;
}
