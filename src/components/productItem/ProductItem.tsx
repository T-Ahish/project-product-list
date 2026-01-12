import { useState } from "react";
import type { Product } from "../../utils/products.interface";
import styles from "./ProductItem.module.css";
import EditIcon from "@mui/icons-material/Edit";
import VariantRow from "../variantRow/VariantRow";

interface Props {
  product: Product;
  index: number;
  noItem?: boolean;
}

const ProductItem = ({ product, index, noItem }: Props) => {
  const [showVariants, setShowVariants] = useState(false);

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
      <section className={styles.wrapper}>
        <div className={styles.item}>
          <p className={styles.itemNumber}>{index + 1}.</p>

          <section className={styles.itemName}>
            <input type="text" value={product.title} readOnly />
            <EditIcon fontSize="small" />
          </section>

          <button className={styles.itemDiscount}>Add Discount</button>

          <button className={styles.itemRemove}>X</button>
        </div>

        {product.variants.length > 0 && (
          <button
            className={styles.variantToggle}
            onClick={() => setShowVariants((v) => !v)}
          >
            {showVariants ? "Hide variants" : "Show variants"}
          </button>
        )}

        {showVariants &&
          product.variants.map((variant) => (
            <VariantRow key={variant.id} variant={variant} />
          ))}
      </section>
    );
  }
};

export default ProductItem;
