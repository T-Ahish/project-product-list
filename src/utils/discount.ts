import type { Product, DiscountType, Discount } from "./products.interface";

export const toNumberPrice = (
  priceStr: string | number | null | undefined
): number => {
  if (typeof priceStr === "number") return priceStr;
  if (typeof priceStr === "string") {
    const n = Number(priceStr.trim());
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

export const computeMinVariantPrice = (product: Product): number => {
  const nums = product.variants
    .map((v) => toNumberPrice(v.price))
    .filter((n) => Number.isFinite(n));
  if (nums.length === 0) return 0;
  return Math.min(...nums);
};

export const clampDiscountValue = (
  value: number,
  mode: DiscountType,
  product: Product
): number => {
  if (mode === "flat") {
    const cap = computeMinVariantPrice(product);
    return Math.max(0, Math.min(value, cap));
  }

  return Math.max(0, Math.min(value, 100));
};

export const applyDiscountToPrice = (
  price: number,
  discount: Discount
): number => {
  if (!Number.isFinite(price)) return price;
  if (discount.type === "flat") {
    return Math.max(0, price - discount.value);
  }

  return Math.max(0, price - (price * discount.value) / 100);
};
