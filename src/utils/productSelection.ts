import type { Product } from "./products.interface";

export const getVariantIdsForProduct = (
  products: Product[],
  productId: number
): number[] => {
  return (
    products.find((p) => p.id === productId)?.variants.map((v) => v.id) ?? []
  );
};

export const getProductIdByVariant = (
  products: Product[],
  variantId: number
): number | undefined => {
  return products.find((p) => p.variants.some((v) => v.id === variantId))?.id;
};

export const removeProduct = (
  products: Product[],
  productId: number,
  confirmedProducts: number[],
  confirmedVariants: number[],
  selectedProducts: number[],
  selectedVariants: number[]
) => {
  const variantIds = getVariantIdsForProduct(products, productId);

  return {
    nextConfirmedProducts: confirmedProducts.filter((id) => id !== productId),
    nextConfirmedVariants: confirmedVariants.filter(
      (id) => !variantIds.includes(id)
    ),
    nextSelectedProducts: selectedProducts.filter((id) => id !== productId),
    nextSelectedVariants: selectedVariants.filter(
      (id) => !variantIds.includes(id)
    ),
  };
};

export const getConfirmedVariantIdsForProduct = (
  products: Product[],
  productId: number,
  confirmedVariantIds: number[]
): number[] => {
  const productVariantIds = getVariantIdsForProduct(products, productId);
  return confirmedVariantIds.filter((id) => productVariantIds.includes(id));
};

export const removeVariant = (
  products: Product[],
  variantId: number,
  confirmedProducts: number[],
  confirmedVariants: number[],
  selectedProducts: number[],
  selectedVariants: number[]
) => {
  const nextConfirmedVariants = confirmedVariants.filter(
    (id) => id !== variantId
  );
  const nextSelectedVariants = selectedVariants.filter(
    (id) => id !== variantId
  );

  const productId = getProductIdByVariant(products, variantId);

  let nextConfirmedProducts = confirmedProducts;
  let nextSelectedProducts = selectedProducts;

  if (productId !== undefined) {
    const remainingConfirmedForProduct = getConfirmedVariantIdsForProduct(
      products,
      productId,
      nextConfirmedVariants
    );

    if (remainingConfirmedForProduct.length === 0) {
      nextConfirmedProducts = confirmedProducts.filter(
        (id) => id !== productId
      );
      nextSelectedProducts = selectedProducts.filter((id) => id !== productId);
    }
  }

  return {
    nextConfirmedProducts,
    nextConfirmedVariants,
    nextSelectedProducts,
    nextSelectedVariants,
  };
};

export const removeProductFromSelected = (
  products: Product[],
  productId: number,
  selectedProducts: number[],
  selectedVariants: number[]
) => {
  const variantIds = getVariantIdsForProduct(products, productId);

  return {
    nextSelectedProducts: selectedProducts.filter((id) => id !== productId),
    nextSelectedVariants: selectedVariants.filter(
      (id) => !variantIds.includes(id)
    ),
  };
};
