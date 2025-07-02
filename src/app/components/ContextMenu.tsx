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
        <div className="flex items-center justify-between h-10 bg-[#FAFBFC] text-[#1A1A1A] text-[14px] px-3 py-2 border-[1px] border-[#E1E1E1] rounded-tl-lg rounded-tr-lg font-medium">
          {pageTitle}
        </div>
        <div className="flex flex-col bg-white rounded-br-lg rounded-bl-lg">
          {options.slice(0, options.length - 1).map((option, index) => (
            <div
              className={`flex items-center gap-x-1.5 px-3 pt-2 hover:bg-[#9da4b226] text-sm
                ${option.label === "Delete" ? "text-[#EF494F]" : "text-[#1A1A1A]"} cursor-pointer
                ${index === options.length - 1 ? "pb-0" : "pb-2"}`}
              key={index}
            >
              {option.icon}
              <span>{option.label}</span>
            </div>
          ))}
          <div className="h-[1px] w-[90%] bg-[#E1E1E1] mx-3"></div>
          <div
            className="flex items-center gap-x-1.5 px-3 pt-2 pb-2 hover:bg-[#9da4b226] 
             text-[#EF494F] cursor-pointer rounded-br-lg rounded-bl-lg bg-white"
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
