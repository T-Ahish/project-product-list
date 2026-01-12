import { useState } from "react";
import AddProduct from "../addProduct/AddProduct";
import styles from "./ProductList.module.css";
import ProductItem from "../productItem/ProductItem";
import { useProducts } from "../../hooks/useProduct";
import type { Product } from "../../utils/products.interface";

const ProductList = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);
  const [confirmedProducts, setConfirmedProducts] = useState<number[]>([]);
  const [confirmedVariants, setConfirmedVariants] = useState<number[]>([]);

  const { products, loading, hasMore, loadNextPage } = useProducts();

  const handleConfirmSelection = () => {
    setConfirmedProducts(selectedProducts);
    setConfirmedVariants(selectedVariants);
  };

  const handleCancelSelection = () => {
    setSelectedProducts(confirmedProducts);
    setSelectedVariants(confirmedVariants);
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

  console.log(filteredProducts);

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
          <ProductItem key={product.id} product={product} index={index} />
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
          confirmSelection={handleConfirmSelection}
          cancelSelection={handleCancelSelection}
        />
      </div>
    </article>
  );
};

export default ProductList;
