import {
  FlagIcon,
  ClipboardIcon,
  CopyIcon,
  TrashIcon,
  PenLineIcon,
  InfoIcon,
  FileTextIcon,
  CircleCheckIcon,
} from "lucide-react";
import { ContextMenuOption, PageItem } from "@/types";
import { CONTEXT_MENU_CONFIG, INITIAL_PAGE_CONFIG } from "@/lib/constants";

export const getIcon = (
  iconName: string,
  size: number = 16,
  color?: string,
) => {
  const iconProps = { size, ...(color && { color }) };

  switch (iconName) {
    case "FlagIcon":
      return <FlagIcon {...iconProps} />;
    case "PenLineIcon":
      return <PenLineIcon {...iconProps} />;
    case "ClipboardIcon":
      return <ClipboardIcon {...iconProps} />;
    case "CopyIcon":
      return <CopyIcon {...iconProps} />;
    case "TrashIcon":
      return <TrashIcon {...iconProps} />;
    case "InfoIcon":
      return <InfoIcon {...iconProps} />;
    case "FileTextIcon":
      return <FileTextIcon {...iconProps} />;
    case "CircleCheckIcon":
      return <CircleCheckIcon {...iconProps} />;
    default:
      console.warn(
        `[getIcon] Unknown icon name: ${iconName}. Using FileTextIcon as fallback.`,
      );
      return <FileTextIcon {...iconProps} />;
  }
};

export const getContextMenuOptions = (): ContextMenuOption[] => {
  return CONTEXT_MENU_CONFIG.map((config) => ({
    icon: getIcon(config.iconName, 16, config.color),
    label: config.label,
    color: config.color,
  }));
};

export const getInitialItems = (): PageItem[] => {
  return INITIAL_PAGE_CONFIG.map((config) => ({
    id: config.id,
    label: config.label,
    isActive: config.isActive,
    icon: getIcon(config.iconName, 16),
  }));
};
