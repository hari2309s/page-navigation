import { useState, useRef, useEffect, useCallback } from "react";
import { ContextMenuPosition } from "@/types";

export interface UseContextMenuReturn {
  showContextMenu: boolean;
  menuReady: boolean;
  isMenuHovered: boolean;
  contextMenuPosition: ContextMenuPosition;
  contextMenuRef: React.RefObject<HTMLDivElement | null>;
  stepRef: React.RefObject<HTMLDivElement | null>;
  setIsMenuHovered: (hovered: boolean) => void;
  handleContextMenuClick: (
    e: React.MouseEvent<SVGSVGElement>,
    label: string,
    onContextMenu: (e: React.MouseEvent<SVGSVGElement>, label: string) => void,
  ) => void;
  closeContextMenu: () => void;
}

export const useContextMenu = (): UseContextMenuReturn => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition>({
      top: 0,
      left: 0,
    });
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const stepRef = useRef<HTMLDivElement | null>(null);

  const updateContextMenuPosition = useCallback(() => {
    if (stepRef.current && contextMenuRef.current) {
      const rect = stepRef.current.getBoundingClientRect();
      const menuWidth = contextMenuRef.current.offsetWidth;
      const menuHeight = contextMenuRef.current.offsetHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let left = rect.right - menuWidth + window.scrollX;
      let top = rect.top - menuHeight - 8 + window.scrollY;

      if (left < window.scrollX) left = window.scrollX;
      if (left + menuWidth > window.scrollX + viewportWidth)
        left = window.scrollX + viewportWidth - menuWidth;
      if (top < window.scrollY) top = window.scrollY;
      if (top + menuHeight > window.scrollY + viewportHeight)
        top = window.scrollY + viewportHeight - menuHeight;

      setContextMenuPosition({
        top,
        left,
      });
      setMenuReady(true);
    }
  }, []);

  const closeContextMenu = useCallback(() => {
    setShowContextMenu(false);
    setIsMenuHovered(false);
    setMenuReady(false);
  }, []);

  const handleContextMenuClick = useCallback(
    (
      e: React.MouseEvent<SVGSVGElement>,
      label: string,
      onContextMenu: (
        e: React.MouseEvent<SVGSVGElement>,
        label: string,
      ) => void,
    ) => {
      e.stopPropagation();
      e.preventDefault();
      onContextMenu(e, label);
      setShowContextMenu(true);
      setMenuReady(false);
    },
    [],
  );

  useEffect(() => {
    if (showContextMenu && contextMenuRef.current && !menuReady) {
      requestAnimationFrame(() => {
        updateContextMenuPosition();
      });
    }
  }, [showContextMenu, menuReady, updateContextMenuPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showContextMenu &&
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        closeContextMenu();
      }
    };

    const handleResize = () => {
      if (showContextMenu && contextMenuRef.current && menuReady) {
        updateContextMenuPosition();
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [showContextMenu, closeContextMenu, updateContextMenuPosition, menuReady]);

  return {
    showContextMenu,
    menuReady,
    isMenuHovered,
    contextMenuPosition,
    contextMenuRef,
    stepRef,
    setIsMenuHovered,
    handleContextMenuClick,
    closeContextMenu,
  };
};
