import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productAPI";
import type { Product } from "../utils/products.interface";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadProducts = async (pageNo: number) => {
    if (loading) return;
    setLoading(true);
    const res = await fetchProducts({ page: pageNo, limit: 10 });
    setProducts((prev) => [...prev, ...res.data]);
    setHasMore(res.hasMore);
    setLoading(false);
  };

  const loadNextPage = () => {
    if (!hasMore || loading) return;
    const next = page + 1;
    setPage(next);
    loadProducts(next);
  };

  useEffect(() => {
    loadProducts(1);
  }, []);

  return { products, loading, hasMore, loadNextPage };
};
