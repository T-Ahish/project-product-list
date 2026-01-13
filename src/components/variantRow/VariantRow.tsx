import type { Variant } from "../../utils/products.interface";
import styles from "./VariantRow.module.css";
import type { Discount, DiscountType } from "../../utils/products.interface";
import { useState } from "react";

interface props {
  variant: Variant;
  handleRemoveVariant: (id: number) => void;
  variantDiscount?: Discount;
  onVariantDiscountChange?: (discount: Discount) => void;
}

const VariantRow = ({
  variant,
  handleRemoveVariant,
  variantDiscount,
  onVariantDiscountChange,
}: props) => {
  const [editing, setEditing] = useState(false);

  const currentMode: DiscountType = variantDiscount?.type ?? "flat";
  const currentValue = variantDiscount?.value ?? 0;

  const handleModeChange = (type: DiscountType) => {
    onVariantDiscountChange?.({ type, value: currentValue });
  };

  const handleValueChange = (next: number) => {
    onVariantDiscountChange?.({ type: currentMode, value: next });
  };

  return (
    <div className={styles.variantRow}>
      <div className={styles.variantName}>{variant.title}</div>

      {!editing ? (
        <button
          className={styles.variantDiscount}
          onClick={() => setEditing(true)}
          title="Add Discount"
        >
          Add Discount
        </button>
      ) : (
        <div className={styles.variantEditor}>
          <input
            type="number"
            min={0}
            step={currentMode === "percent" ? 1 : 0.01}
            value={currentValue}
            onChange={(e) => handleValueChange(Number(e.target.value))}
            className={styles.variantValue}
            aria-label={`Variant discount value (${currentMode})`}
          />

          <select
            value={currentMode}
            onChange={(e) => handleModeChange(e.target.value as DiscountType)}
            className={styles.variantMode}
            aria-label="Variant discount type"
          >
            <option value="flat">Flat</option>
            <option value="percent">% Off</option>
          </select>

          {/* Commenting the Save Button - Can be Enabled if needed */}
          {/* <button
            type="button"
            className={styles.variantDone}
            onClick={() => setEditing(false)}
          >
            Done
          </button> */}
        </div>
      )}

      <button
        className={styles.variantRemove}
        onClick={() => handleRemoveVariant(variant.id)}
      >
        X
      </button>
    </div>
  );
};

export default VariantRow;
