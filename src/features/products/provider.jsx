import { useCallback, useEffect, useMemo, useState } from "react";
import ProductsContext from "./context";

import {
  fetchProductsApi,
  fetchCartApi,
  addToCartApi,
  deleteFromCartApi,
} from "./api";

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsResponse, cartResponse] = await Promise.all([
          fetchProductsApi(),
          fetchCartApi(),
        ]);

        const normalizedProducts = Array.isArray(productsResponse)
          ? productsResponse
          : productsResponse?.data || [];

        const normalizedCart = Array.isArray(cartResponse)
          ? cartResponse
          : cartResponse?.data || [];

        setProducts(normalizedProducts);
        setCartData(normalizedCart);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addToCart = useCallback(async (item) => {
    try {
      const createdItem = await addToCartApi(item);
      setCartData((prev) => [...prev, createdItem]);
    } catch (err) {
      console.error("Failed to add item:", err);
      setError("Failed to add item");
    }
  }, []);

  const removeFromCart = useCallback(async (id) => {
    try {
      await deleteFromCartApi(id);
      setCartData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to remove item:", err);
      setError("Failed to remove item");
    }
  }, []);

  const totalPrice = useMemo(
    () => cartData.reduce((sum, item) => sum + Number(item.price || 0), 0),
    [cartData],
  );

  const contextValue = useMemo(
    () => ({
      products,
      cartData,
      loading,
      error,
      addToCart,
      removeFromCart,
      totalPrice,
    }),
    [products, cartData, loading, error, addToCart, removeFromCart, totalPrice],
  );

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
