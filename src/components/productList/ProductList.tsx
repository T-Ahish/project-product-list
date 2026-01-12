import { useState } from "react";
import AddProduct from "../addProduct/AddProduct";
import styles from "./ProductList.module.css";
import ProductItem from "../productItem/ProductItem";
import { useProducts } from "../../hooks/useProduct";

const ProductList = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);

  const { products, loading, hasMore, loadNextPage } = useProducts();

  const filteredProducts = products
    .map((product) => {
      const filteredVariants = product.variants.filter((variant) =>
        selectedVariants.includes(variant.id)
      );

      const isProductSelected = selectedProducts.includes(product.id);
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
    .filter(Boolean);

  console.log(filteredProducts);

  return (
    <article className={styles.productList}>
      <h1 className={styles.productListHeading}>Add Products</h1>
      <section className={styles.listLabels}>
        <h2>Product</h2>
        <h2>Discount</h2>
      </section>

      <ProductItem />

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
        />
      </div>
    </article>
  );
};

export default ProductList;
