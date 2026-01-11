import AddProduct from "../addProduct/AddProduct";
import styles from "./ProductList.module.css";

const ProductList = () => {
  return (
    <article className={styles.productList}>
      <h1 className={styles.productListHeading}>Add Products</h1>
      <section className={styles.listLabels}>
        <h2>Product</h2>
        <h2>Discount</h2>
      </section>

      <section>
        <p>1.</p>
        <section>
          <input type="text" placeholder="Select Product" readOnly />
          <button>Edit</button>
        </section>
        <button>Add Discount</button>
      </section>

      <AddProduct />
    </article>
  );
};

export default ProductList;
