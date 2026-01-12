import styles from "./ProductItem.module.css";
import EditIcon from "@mui/icons-material/Edit";

const ProductItem = () => {
  return (
    <section className={styles.item}>
      <p className={styles.itemNumber}>1.</p>
      <section className={styles.itemName}>
        <input type="text" placeholder="Select Product" readOnly />
        <EditIcon fontSize="small" />
      </section>
      <button className={styles.itemDiscount}>Add Discount</button>
    </section>
  );
};

export default ProductItem;
