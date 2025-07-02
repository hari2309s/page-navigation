"use client";

import React, { useState, useCallback } from "react";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { PageItem } from "@/types";
import { getInitialItems, getIcon } from "@/lib/iconUtils";
import {
  INITIAL_ACTIVE_PAGE,
  MAX_PAGES,
  ANIMATION_CONFIG,
} from "@/lib/constants";
import NavigationStep from "@/components/NavigationStep";

const GRADIENT_SEPARATOR_STYLE = {
  background: "linear-gradient(to right, #C0C0C0 50%, transparent 50%)",
  backgroundSize: "6px 1px",
  backgroundRepeat: "repeat-x",
};

const PageNavigation: React.FC = () => {
  const [items, setItems] = useState<PageItem[]>(getInitialItems());
  const [activePage, setActivePage] = useState<string>(INITIAL_ACTIVE_PAGE);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [addButtonHovered, setAddButtonHovered] = useState(false);
  const isPageLimitReached = items.length >= MAX_PAGES;

  const handleAddPage = useCallback(
    (index: number) => {
      // limiting the number of pages to 10 in order to avoid cluttering the UI to provide better UX
      if (items.length >= MAX_PAGES) return;

      const newItems = [...items];
      const newPageNumbers = newItems
        .filter((item) => item.label.startsWith("New Page"))
        .map((item) => {
          const match = item.label.match(/^New Page (\d+)$/);
          return match ? parseInt(match[1], 10) : 0;
        });
      const nextNumber =
        newPageNumbers.length > 0 ? Math.max(...newPageNumbers) + 1 : 1;
      const newPageLabel = `New Page ${nextNumber}`;
      newItems.splice(index + 1, 0, {
        id: `${Date.now()}`,
        label: newPageLabel,
        icon: getIcon("FileTextIcon", 16),
      });

      setItems(newItems);
      setActivePage(newPageLabel);
      setHoverIndex(null);
    },
    [items],
  );

  return (
    <nav
      className="flex items-center bg-white p-2 w-max flex-wrap rounded-lg"
      role="tablist"
      aria-label="Page navigation"
    >
      <Reorder.Group
        axis="x"
        values={items}
        onReorder={setItems}
        className="flex items-center"
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <NavigationStep
                item={item}
                isActive={item.label === activePage}
                onClick={() => setActivePage(item.label)}
              />
            </motion.div>
            {index < items.length - 1 && (
              <div
                className="flex items-center relative"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <motion.div
                  className="h-px bg-[var(--color-gradient-separator)]"
                  style={GRADIENT_SEPARATOR_STYLE}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    ...ANIMATION_CONFIG.gapVariants.normal,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    ...(hoverIndex === index && !isPageLimitReached
                      ? ANIMATION_CONFIG.gapVariants.expanded
                      : ANIMATION_CONFIG.gapVariants.normal),
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    ...ANIMATION_CONFIG.gapVariants.normal,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <AnimatePresence>
                  {hoverIndex === index && !isPageLimitReached && (
                    <motion.button
                      variants={ANIMATION_CONFIG.addButtonVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      onClick={() => handleAddPage(index)}
                      className="absolute left-1/2 transform -translate-x-1/2 bg-white text-black rounded-full border border-border w-4 h-4 flex items-center justify-center"
                    >
                      <PlusIcon size={8} className="cursor-pointer" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}
          </React.Fragment>
        ))}
      </Reorder.Group>
      <motion.div
        className="h-px bg-[var(--color-gradient-separator)]"
        style={{
          background:
            "linear-gradient(to right, var(--color-gradient-separator) 50%, transparent 50%)",
          backgroundSize: "6px 1px",
          backgroundRepeat: "repeat-x",
        }}
        variants={ANIMATION_CONFIG.gapVariants}
        initial="normal"
      />
      <div
        className="relative flex items-center"
        onMouseEnter={() => setAddButtonHovered(true)}
        onMouseLeave={() => setAddButtonHovered(false)}
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className={`flex items-center gap-1.5 h-8 text-sm bg-[var(--color-button-bg)] text-[var(--color-active-text)] border-[1px] border-[var(--color-border)] px-3 py-1 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isPageLimitReached ? "cursor-not-allowed opacity-60" : "hover:cursor-pointer hover:bg-[var(--color-hover-bg-opaque)]"}`}
          onClick={() => handleAddPage(items.length - 1)}
          aria-label="Add new page"
          disabled={isPageLimitReached}
        >
          <PlusIcon size={16} />
          Add page
        </motion.button>
        {isPageLimitReached && addButtonHovered && (
          <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap z-10">
            Maximum number of pages reached
          </div>
        )}
      </div>
    </nav>
  );
};

export default PageNavigation;
