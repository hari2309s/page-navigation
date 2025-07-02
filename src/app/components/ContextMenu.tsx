import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { ContextMenuOption } from "@/types";

interface ContextMenuProps {
  pageTitle: string;
  options: ContextMenuOption[];
  style: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ pageTitle, options, style, onMouseEnter, onMouseLeave, onFocus }, ref) => {
    const menu = (
      <div
        className="fixed w-60 rounded-xl shadow-lg z-1000"
        style={style}
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
      >
        <div className="flex items-center justify-between h-10 bg-[var(--color-contextmenu-header-bg)] text-[var(--color-active-text)] text-[14px] px-3 py-2 border-[1px] border-[var(--color-border)] rounded-tl-lg rounded-tr-lg font-medium">
          {pageTitle}
        </div>
        <div className="flex flex-col bg-white rounded-br-lg rounded-bl-lg">
          {options.slice(0, options.length - 1).map((option, index) => (
            <div
              className={`flex items-center gap-x-1.5 px-3 pt-2 hover:bg-[var(--color-hover-bg)] text-sm
                ${option.label === "Delete" ? "text-[var(--color-contextmenu-delete)]" : "text-[var(--color-active-text)]"} cursor-pointer
                ${index === options.length - 1 ? "pb-0" : "pb-2"}`}
              key={index}
            >
              {option.icon}
              <span>{option.label}</span>
            </div>
          ))}
          <div className="h-[1px] w-[90%] bg-[var(--color-contextmenu-divider)] mx-3"></div>
          <div
            className="flex items-center gap-x-1.5 px-3 pt-2 pb-2 hover:bg-[var(--color-hover-bg)] 
             text-[var(--color-contextmenu-delete)] cursor-pointer rounded-br-lg rounded-bl-lg bg-white"
          >
            {options[options.length - 1].icon}
            <span>{options[options.length - 1].label}</span>
          </div>
        </div>
      </div>
    );

    return typeof window !== "undefined"
      ? ReactDOM.createPortal(menu, document.body)
      : null;
  },
);

ContextMenu.displayName = "ContextMenu";

export default React.memo(ContextMenu);
