import type { Variant } from "../../utils/products.interface";
import styles from "./VariantRow.module.css";

const VariantRow = ({ variant }: { variant: Variant }) => {
  return (
    <div className={styles.variantRow}>
      <div className={styles.variantName}>{variant.title}</div>

      <button className={styles.variantDiscount}>Add Discount</button>

      <button className={styles.variantRemove}>X</button>
    </div>
  );
};

export default VariantRow;
