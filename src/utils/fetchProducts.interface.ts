import type { Product } from "./products.interface";

export interface FetchProducts {
  selectedProducts: number[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVariants: number[];
  setSelectedVariants: React.Dispatch<React.SetStateAction<number[]>>;
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  loadNextPage: () => void;
}
