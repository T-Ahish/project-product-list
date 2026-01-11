import products from "../data/products.json";

export type DiscountType = "flat" | "percentage";

export interface Discount {
  type: DiscountType;
  value: number;
}

export interface Variant {
  id: number | string;
  product_id: number;
  title: string;
  price: string;
  discount?: Discount;
}

export interface Product {
  id: number;
  title: string;
  variants: Variant[];
  image: {
    src: string;
  };
  discount?: Discount;
}

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
