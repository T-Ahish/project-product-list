import products from "../data/products.json";
import type { Product } from "../utils/products.interface";

export function fetchProducts({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ data: Product[]; hasMore: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = products;

      if (search) {
        filtered = products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      const start = (page - 1) * limit;
      const end = start + limit;

      resolve({
        data: filtered.slice(start, end),
        hasMore: end < filtered.length,
      });
    }, 200);
  });
}
