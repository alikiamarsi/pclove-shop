# PCLove Shop

A modern and responsive PC components and gaming accessories storefront built with Next.js.

Users can browse and search products, apply filters and sorting, manage their cart and wishlist, switch between light and dark themes, and preview products without leaving the current page.

> **Note:** This is a frontend/demo project. The checkout flow does not process real payments or create actual orders.

---

## Features

- Product catalogue with server-side filtering and pagination
- Search products by title
- Filter products by:
  - Category
  - Brand
  - Price range
  - Rating
  - Stock availability
- Sort products by:
  - Price: Low to High
  - Price: High to Low
  - Rating: High to Low
- Responsive product grid with selectable column layouts
- Animated product grid layout transitions
- Responsive desktop and mobile navigation
- Product details page
- Loading, error, and not-found states
- Quick product preview using Floating UI
- Cart management with stock-aware quantity limits
- Wishlist functionality
- Cart and wishlist persistence using `localStorage`
- Light and dark mode support
- Interactive 3D hero section built with React Three Fiber
- Demo checkout flow and order summary

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Redux
- Zustand
- React Three Fiber
- Drei
- Three.js
- next-themes
- Framer Motion
- Floating UI
- Lucide React

---

## Requirements

Before running the project, make sure you have:

- Node.js 20 or newer
- npm
- A products API available through `NEXT_PUBLIC_API_URL`

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>