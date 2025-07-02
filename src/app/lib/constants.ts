export const MAX_PAGES = 10; // limiting the number of pages to 10 to avoid cluttered UI to provide better UX

export const INITIAL_ACTIVE_PAGE = "Info";

export const CONTEXT_MENU_CONFIG = [
  { iconName: "FlagIcon", color: "#2F72E2", label: "Set as first page" },
  { iconName: "PenLineIcon", color: "#9DA4B2", label: "Rename" },
  { iconName: "ClipboardIcon", color: "#9DA4B2", label: "Copy" },
  { iconName: "CopyIcon", color: "#9DA4B2", label: "Duplicate" },
  { iconName: "TrashIcon", color: "#EF494F", label: "Delete" },
] as const;

export const INITIAL_PAGE_CONFIG = [
  { id: "1", label: "Info", isActive: true, iconName: "InfoIcon" },
  { id: "2", label: "Details", isActive: false, iconName: "FileTextIcon" },
  { id: "3", label: "Other", isActive: false, iconName: "FileTextIcon" },
  { id: "4", label: "Ending", isActive: false, iconName: "CircleCheckIcon" },
] as const;

export const ANIMATION_CONFIG = {
  gapVariants: {
    normal: { width: "20px" },
    expanded: { width: "56px", transition: { duration: 0.3 } },
  },
  addButtonVariants: {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  },
} as const;
