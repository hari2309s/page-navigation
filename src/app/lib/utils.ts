import { PageItem } from "@/types";

export const MAX_PAGES = 10;

export const initialActivePage = "Info";

export const generateNewPageLabel = (items: PageItem[]) => {
  const newPageNumbers = items
    .filter((item) => item.label.startsWith("New Page"))
    .map((item) => {
      const match = item.label.match(/^New Page (\d+)$/);
      return match ? parseInt(match[1], 10) : 0;
    });
  return `New Page ${newPageNumbers.length > 0 ? Math.max(...newPageNumbers) + 1 : 1}`;
};
