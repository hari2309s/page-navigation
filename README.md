# Page Navigation (Next.js)

A modern, interactive page navigation UI built with Next.js, React, Tailwind CSS, and Framer Motion. Features drag-and-drop reordering, context menus, and a customizable theme using CSS variables.

## Features

- **Drag-and-drop** page navigation with smooth animations (powered by Framer Motion)
- **Context menu** for each navigation step (right-click or menu button)
- **Keyboard accessibility** and focus styles
- **Customizable theme** via CSS variables
- **Responsive** and modern UI
- **Static export** and deployable to GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm/bun)

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Build & Export (Static)

```bash
npm run build && npx next export
```

The static site will be output to the `out/` directory.

## Project Structure

```
src/
  app/
    components/
      ContextMenu.tsx      # Context menu for navigation steps
      NavigationStep.tsx   # Individual navigation step (draggable)
      PageNavigation.tsx   # Main navigation bar
    hooks/
      useContextMenu.ts   # Context menu logic
    lib/                  # Utilities and constants
    types/                # TypeScript types
    globals.css           # Global styles and theme variables
    page.tsx              # Main entry point
```

> **Note:** Drag-and-drop functionality is handled by Framer Motion's `Reorder.Group` and `Reorder.Item` components. No custom drag-and-drop hook is needed.

## Theming

All colors and key styles are defined as CSS variables in `src/app/globals.css` under the `:root` selector. You can easily customize the look and feel by editing these variables.

## Deployment (GitHub Pages)

This project is set up to deploy to GitHub Pages using GitHub Actions:

- On every push to `main`, the app is built and statically exported to the `gh-pages` branch.
- To enable Pages, go to your repository settings and set Pages to deploy from the `gh-pages` branch, root directory.

## Scripts

- `dev` – Start development server
- `build` – Build for production
- `start` – Start production server
- `lint` – Run ESLint
- `format` – Format code with Prettier
- `format:check` – Check formatting

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)

## License

MIT
