import React, { useMemo } from "react";
import { Reorder } from "framer-motion";
import { EllipsisVertical } from "lucide-react";
import { useContextMenu } from "@/app/hooks/useContextMenu";
import { getContextMenuOptions } from "@/lib/iconUtils";
import { PageItem } from "@/types";
import ContextMenu from "@/components/ContextMenu";
import { getIcon } from "@/lib/iconUtils";

interface NavigationStepProps {
  item: PageItem;
  isActive: boolean;
  onClick: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
}

const NavigationStep: React.FC<NavigationStepProps> = ({
  item,
  isActive,
  onClick,
}) => {
  const {
    showContextMenu,
    contextMenuPosition,
    isMenuHovered,
    contextMenuRef,
    stepRef,
    setIsMenuHovered,
    handleContextMenuClick,
    menuReady,
    closeContextMenu,
  } = useContextMenu();

  const contextMenuOptions = useMemo(() => getContextMenuOptions(), []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <Reorder.Item
      value={item}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      ref={stepRef}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onDragStart={closeContextMenu}
      className={`flex gap-2 items-center py-1 px-2.5 h-8 cursor-pointer rounded-lg
        outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        focus-visible:shadow-[0_0_0_4px_rgba(47,114,226,0.3)] focus-visible:outline-[#2f72e2]
        ${isActive ? "bg-white border-[1px] border-[var(--color-border)]" : "bg-[var(--color-hover-bg)]"} 
        ${!showContextMenu && !isMenuHovered && !isActive ? "hover:bg-[var(--color-hover-bg-opaque)] hover:text-[var(--color-inactive-text)]" : ""}
        ${!isActive && "!focus:bg-[var(--color-hover-bg-opaque)] !focus:text-[var(--color-inactive-text)]"}`}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 2px 8px var(--color-hover-shadow)",
      }}
      whileTap={{ scale: 0.98 }}
      whileDrag={{
        scale: 1.05,
        boxShadow: "0 2px 8px var(--color-drag-shadow)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex-1 flex items-center gap-1.5">
        <span
          className={`${isActive ? "text-[var(--color-active-icon)]" : "text-[var(--color-inactive-icon)]"}`}
        >
          {item?.icon ?? getIcon("FileTextIcon", 16)}
        </span>
        <span
          className={`text-[var(--color-inactive-text)] text-sm ${isActive ? "text-[var(--color-active-text)]" : ""}`}
        >
          {item?.label}
        </span>
      </div>
      {isActive && (
        <>
          <EllipsisVertical
            color={
              isActive
                ? "var(--color-contextmenu-icon)"
                : "var(--color-active-text)"
            }
            size={16}
            onClick={(e) => handleContextMenuClick(e, item.label, () => {})}
            className="ml-1 cursor-pointer"
          />
          {showContextMenu && (
            <ContextMenu
              ref={contextMenuRef}
              pageTitle={item.label}
              options={contextMenuOptions}
              style={{
                top: contextMenuPosition.top,
                left: contextMenuPosition.left,
                opacity: menuReady ? 1 : 0,
                pointerEvents: menuReady ? "auto" : "none",
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                setIsMenuHovered(true);
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setIsMenuHovered(false);
              }}
              onFocus={(e) => e.stopPropagation()}
            />
          )}
        </>
      )}
    </Reorder.Item>
  );
};

export default React.memo(NavigationStep);
