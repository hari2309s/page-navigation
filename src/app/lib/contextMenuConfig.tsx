import {
  FlagIcon,
  PenLineIcon,
  ClipboardIcon,
  CopyIcon,
  TrashIcon,
} from "lucide-react";

export const contextMenuOptions = [
  {
    icon: <FlagIcon color="#2F72E2" size={16} />,
    label: "Set as first page",
    color: "#2F72E2",
  },
  {
    icon: <PenLineIcon color="#9DA4B2" size={16} />,
    label: "Rename",
    color: "#9DA4B2",
  },
  {
    icon: <ClipboardIcon color="#9DA4B2" size={16} />,
    label: "Copy",
    color: "#9DA4B2",
  },
  {
    icon: <CopyIcon color="#9DA4B2" size={16} />,
    label: "Duplicate",
    color: "#9DA4B2",
  },
  {
    icon: <TrashIcon color="#EF494F" size={16} />,
    label: "Delete",
    color: "#EF494F",
  },
];
