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
        ${isActive ? "bg-white border-[1px] border-[#E1E1E1]" : "bg-[#9da4b226]"} 
        ${!showContextMenu && !isMenuHovered && !isActive ? "hover:bg-[#9da4b259] hover:text-[#677289]" : ""}
        ${!isActive && "!focus:bg-[#9da4b259] !focus:text-[#677289]"}`}
      whileHover={{ scale: 1.03, boxShadow: "0 2px 8px rgba(47,114,226,0.08)" }}
      whileTap={{ scale: 0.98 }}
      whileDrag={{ scale: 1.05, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex-1 flex items-center gap-1.5">
        <span className={`${isActive ? "text-[#F59D0E]" : "text-[#8C93A1]"}`}>
          {item?.icon ?? getIcon("FileTextIcon", 16)}
        </span>
        <span
          className={`text-[#677289] text-sm ${isActive ? "text-[#1A1A1A]" : ""}`}
        >
          {item?.label}
        </span>
      </div>
      {isActive && (
        <>
          <EllipsisVertical
            color={isActive ? "#9DA4B2" : "#1A1A1A"}
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
