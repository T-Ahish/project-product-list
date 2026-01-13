import { useState } from "react";
import AddProduct from "../addProduct/AddProduct";
import styles from "./ProductList.module.css";
import ProductItem from "../productItem/ProductItem";
import { useProducts } from "../../hooks/useProduct";
import type { Product, Discount } from "../../utils/products.interface";
import {
  removeProduct,
  removeVariant,
  removeProductFromSelected,
} from "../../utils/productSelection";
import { clampDiscountValue } from "../../utils/discount";

const ProductList = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);
  const [confirmedProducts, setConfirmedProducts] = useState<number[]>([]);
  const [confirmedVariants, setConfirmedVariants] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const [productDiscounts, setProductDiscounts] = useState<
    Record<number, Discount>
  >({});
  const [variantDiscounts, setVariantDiscounts] = useState<
    Record<number, Discount>
  >({});

  const { products, loading, hasMore, loadNextPage } = useProducts();

  const handleConfirmSelection = () => {
    setConfirmedProducts(selectedProducts);
    setConfirmedVariants(selectedVariants);
  };

  const handleCancelSelection = () => {
    setSelectedProducts(confirmedProducts);
    setSelectedVariants(confirmedVariants);
  };

  const handleRemoveProduct = (productId: number) => {
    const {
      nextConfirmedProducts,
      nextConfirmedVariants,
      nextSelectedProducts,
      nextSelectedVariants,
    } = removeProduct(
      products,
      productId,
      confirmedProducts,
      confirmedVariants,
      selectedProducts,
      selectedVariants
    );

    setConfirmedProducts(nextConfirmedProducts);
    setConfirmedVariants(nextConfirmedVariants);
    setSelectedProducts(nextSelectedProducts);
    setSelectedVariants(nextSelectedVariants);

    setProductDiscounts((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
    const variantIds =
      products.find((p) => p.id === productId)?.variants.map((v) => v.id) ?? [];
    setVariantDiscounts((prev) => {
      const next = { ...prev };
      variantIds.forEach((vid) => delete next[vid]);
      return next;
    });
  };

  const handleRemoveVariant = (variantId: number) => {
    const {
      nextConfirmedProducts,
      nextConfirmedVariants,
      nextSelectedProducts,
      nextSelectedVariants,
    } = removeVariant(
      products,
      variantId,
      confirmedProducts,
      confirmedVariants,
      selectedProducts,
      selectedVariants
    );

    setConfirmedProducts(nextConfirmedProducts);
    setConfirmedVariants(nextConfirmedVariants);
    setSelectedProducts(nextSelectedProducts);
    setSelectedVariants(nextSelectedVariants);

    setVariantDiscounts((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [variantId]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleEditProduct = (productId: number) => {
    const { nextSelectedProducts, nextSelectedVariants } =
      removeProductFromSelected(
        products,
        productId,
        selectedProducts,
        selectedVariants
      );

    setSelectedProducts(nextSelectedProducts);
    setSelectedVariants(nextSelectedVariants);
    setOpen(true);
  };

  const handleConfirm = () => {
    handleConfirmSelection();
    setOpen(false);
  };

  const handleCancel = () => {
    handleCancelSelection();
    setOpen(false);
  };

  const handleProductDiscountChange = (
    productId: number,
    discount: Discount
  ) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const clamped: Discount = {
      type: discount.type,
      value: clampDiscountValue(discount.value, discount.type, product),
    };

    setProductDiscounts((prev) => ({ ...prev, [productId]: clamped }));

    const variantIds = product.variants.map((v) => v.id);
    setVariantDiscounts((prev) => {
      const next = { ...prev };
      variantIds.forEach((vid) => (next[vid] = clamped));
      return next;
    });
  };

  const handleVariantDiscountChange = (
    variantId: number,
    discount: Discount
  ) => {
    const product = products.find((p) =>
      p.variants.some((v) => v.id === variantId)
    );
    if (!product) return;

    const clamped: Discount = {
      type: discount.type,
      value: clampDiscountValue(discount.value, discount.type, product),
    };

    setVariantDiscounts((prev) => ({ ...prev, [variantId]: clamped }));
  };

  const filteredProducts = products
    .map((product) => {
      const filteredVariants = product.variants.filter((variant) =>
        confirmedVariants.includes(variant.id)
      );

      const isProductSelected = confirmedProducts.includes(product.id);
      const hasSelectedVariants = filteredVariants.length > 0;

      if (!isProductSelected && !hasSelectedVariants) {
        return null;
      }

      return {
        ...product,
        variants:
          filteredVariants.length > 0 ? filteredVariants : product.variants,
      };
    })
    .filter((p): p is Product => p !== null);

  return (
    <article className={styles.productList}>
      <h1 className={styles.productListHeading}>Add Products</h1>
      <section className={styles.listLabels}>
        <h2>Product</h2>
        <h2>Discount</h2>
      </section>

      {filteredProducts.length === 0 ? (
        <ProductItem noItem={true} />
      ) : (
        filteredProducts.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            index={index}
            handleRemoveProduct={(id: number = 0) => {
              handleRemoveProduct(id);
            }}
            handleRemoveVariant={(id: number = 0) => {
              handleRemoveVariant(id);
            }}
            handleEditProduct={(id: number = 0) => {
              handleEditProduct(id);
            }}
            productDiscount={productDiscounts[product.id]}
            onProductDiscountChange={(discount: Discount) =>
              handleProductDiscountChange(product.id, discount)
            }
            variantDiscounts={variantDiscounts}
            onVariantDiscountChange={handleVariantDiscountChange}
          />
        ))
      )}

      <div className={styles.addProductWrapper}>
        <AddProduct
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          selectedVariants={selectedVariants}
          setSelectedVariants={setSelectedVariants}
          products={products}
          loading={loading}
          hasMore={hasMore}
          loadNextPage={loadNextPage}
          isOpen={open}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          setIsOpen={setOpen}
        />
      </div>
    </article>
  );
};

export default ProductList;
