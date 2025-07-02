# Page Navigation

A modern, interactive page navigation UI built with Next.js, React, Tailwind CSS, and Framer Motion. Features drag-and-drop reordering and context menus.

## Features

- **Drag-and-drop** page navigation with smooth animations (powered by Framer Motion)
- **Context menu** for each navigation step (right-click or menu button)
- **Keyboard accessibility** and focus styles
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

## Deployment (GitHub Pages)

This project is set up to deploy to GitHub Pages using GitHub Actions:

- On every push to `main`, the app is built and statically exported to the `gh-pages` branch.
- To enable Pages, go to your repository settings and set Pages to deploy from the `gh-pages` branch, root directory.

## Scripts

- `dev` – Start development server
- `build` – Build for production
- `deploy` – Deploy to GitHub Pages
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
