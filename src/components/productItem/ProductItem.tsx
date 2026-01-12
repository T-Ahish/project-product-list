import type { Product } from "../../utils/products.interface";
import styles from "./ProductItem.module.css";
import EditIcon from "@mui/icons-material/Edit";

const ProductItem = ({
  product,
  noItem = false,
  index,
}: {
  product?: Product | undefined;
  noItem?: boolean;
  index?: number;
}) => {
  console.log(noItem);
  if (noItem) {
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
  } else {
    return (
      <section className={styles.item}>
        <p className={styles.itemNumber}>
          {index !== undefined ? index + 1 : "1"}.
        </p>
        <section className={styles.itemName}>
          <input type="text" placeholder={product?.title} readOnly />
          <EditIcon fontSize="small" />
        </section>
        <button className={styles.itemDiscount}>Add Discount</button>
        <button className={styles.itemRemove}>X</button>
      </section>
    );
  }
};

export default ProductItem;
