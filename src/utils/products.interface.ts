export type DiscountType = "flat" | "percent";

export interface Discount {
  type: DiscountType;
  value: number;
}

export interface Variant {
  id: number;
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
