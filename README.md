# Sneakers Shop Project 🏃‍♂️👟

A modern e-commerce web application for sneakers built with React and Material-UI.

## 🌐 Live Demo

🔗 \*\*[View Live Project] https://sneakers-store-five.vercel.app/

## ✨ Features

- 🔍 **Smart Search**: Autocomplete brand search with dropdown suggestions
- 💰 **Price Filter**: Interactive price range slider (€0 - max)
- 👥 **Gender Filter**: Filter by Men/Women/All
- 🔄 **Sorting**: Sort by Best Selling, price (low to high, high to low), or name (A-Z, Z-A)
- 📄 **Pagination**: Clean pagination with 9 products per page
- 📱 **Responsive Design**: Optimized for mobile and desktop devices
- 🎨 **Beautiful UI**: Gradient design matching Hero section aesthetics
- ⚡ **Performance Optimized**: Built with useMemo for efficient rendering
- 🛒 **Shopping Cart**: Add products to cart with smooth animations
- ❤️ **Wishlist**: Favorite products with like button

## 🚀 Tech Stack

- **React** - UI library
- **Material-UI (MUI)** - Component library
- **Vite** - Build tool
- **Context API** - State management
- **ESLint** - Code linting

sneackers-shop-project/
├── src/
│ ├── app/
│ ├── assets/
│ │ └── hero/ # Hero section images
│ ├── components/
│ │ ├── Footer.jsx
│ │ ├── Header.jsx
│ │ ├── ProductCard.jsx
│ │ ├── SearchBar.jsx # Brand search with autocomplete
│ │ ├── FilterPanel.jsx # Price & gender filters
│ │ ├── SortDropdown.jsx # Sorting options
│ │ └── Pagination.jsx # Page navigation
│ ├── features/
│ │ └── products/
│ │ ├── context.js
│ │ └── useProducts.js
│ ├── pages/
│ │ └── Home/
│ │ ├── Hero.jsx
│ │ ├── ProductList.jsx
│ │ └── index.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── package.json
└── vite.config.js
