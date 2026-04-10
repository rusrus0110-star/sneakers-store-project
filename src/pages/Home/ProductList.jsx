import { useState, useMemo, useCallback } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import FilterPanel from "../../components/FilterPanel";
import SortDropdown from "../../components/SortDropdown";
import Pagination from "../../components/Pagination";
import useProducts from "../../features/products/useProducts";

const ITEMS_PER_PAGE = 9;

const ProductList = () => {
  const { products, loading, addToCart } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate max price using useMemo
  const maxPrice = useMemo(() => {
    if (products && Array.isArray(products) && products.length > 0) {
      const prices = products
        .map((p) => parseFloat(p.price))
        .filter((p) => !isNaN(p));
      return Math.ceil(Math.max(...prices));
    }
    return 500;
  }, [products]);

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: null, // null means "use the full range" - avoids needing to sync with maxPrice
    gender: "All",
  });

  // Filter and sort using useMemo (not useEffect!)
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    let result = [...products];

    // Search by brand
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(term),
      );
    }

    // Price filter - single pass for both min and max
    const minP = filters.minPrice;
    const maxP = filters.maxPrice !== null ? filters.maxPrice : maxPrice;
    if (minP > 0 || maxP < maxPrice) {
      result = result.filter((p) => {
        const price = parseFloat(p.price);
        return price >= minP && price <= maxP;
      });
    }

    // Gender filter
    if (filters.gender !== "All") {
      result = result.filter((p) => {
        const name = p.name.toLowerCase();
        const gender = filters.gender.toLowerCase();

        if (gender === "men") {
          // Match "men" but NOT "women"
          return name.includes("men") && !name.includes("women");
        } else if (gender === "women") {
          // Match "women"
          return name.includes("women");
        }

        return true;
      });
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchTerm, filters, sortBy, products, maxPrice]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const handleReset = useCallback(() => {
    setFilters({
      minPrice: 0,
      maxPrice: null,
      gender: "All",
    });
    setSearchTerm("");
    setSortBy("default");
    setCurrentPage(1);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!Array.isArray(products)) {
    return <Typography mt={4}>Invalid data format</Typography>;
  }

  if (products.length === 0) {
    return <Typography mt={4}>No products found</Typography>;
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <>
      {/* Search and Sort */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          products={products}
        />
        <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
      </Box>

      {/* Horizontal Filter Panel */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        maxPrice={maxPrice}
      />

      {/* Products Count */}
      <Typography variant="body2" color="text.secondary" mb={2}>
        {filteredProducts.length} products found
      </Typography>

      {/* Products Grid */}
      {paginatedProducts.length === 0 ? (
        <Typography mt={4}>No products match your filters</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, sm: 3, md: 6.5 },
            width: "100%",
          }}
        >
          {paginatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} onAdd={addToCart} />
          ))}
        </Box>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default ProductList;
