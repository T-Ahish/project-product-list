import { useState, useMemo } from "react";
import type {
  Product,
  Discount,
  DiscountType,
} from "../../utils/products.interface";
import styles from "./ProductItem.module.css";
import EditIcon from "@mui/icons-material/Edit";
import VariantRow from "../variantRow/VariantRow";
import {
  computeMinVariantPrice,
  clampDiscountValue,
} from "../../utils/discount";

type BaseProps = {
  handleRemoveProduct?: (id: number) => void;
  handleRemoveVariant?: (id: number) => void;
  handleEditProduct?: (id: number) => void;
  productDiscount?: Discount;
  onProductDiscountChange?: (discount: Discount) => void;
  variantDiscounts?: Record<number, Discount>;
  onVariantDiscountChange?: (variantId: number, discount: Discount) => void;
};

type NoItemProps = BaseProps & {
  noItem: true;
  product?: undefined;
  index?: undefined;
};

type ProductProps = BaseProps & {
  noItem?: false;
  product: Product;
  index: number;
};

type Props = NoItemProps | ProductProps;

const ProductItem = ({
  product,
  index,
  noItem,
  handleRemoveProduct,
  handleRemoveVariant,
  handleEditProduct,
  productDiscount,
  onProductDiscountChange,
  variantDiscounts,
  onVariantDiscountChange,
}: Props) => {
  const [showVariants, setShowVariants] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(false);

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
    const currentMode: DiscountType = productDiscount?.type ?? "flat";
    const currentValue = productDiscount?.value ?? 0;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const minVariantPrice = useMemo(
      () => computeMinVariantPrice(product),
      [product]
    );
    const valueMax = currentMode === "flat" ? minVariantPrice : 100;

    const handleModeChange = (type: DiscountType) => {
      const clamped = clampDiscountValue(currentValue, type, product);
      onProductDiscountChange?.({ type, value: clamped });
    };

    const handleValueChange = (next: number) => {
      const clamped = clampDiscountValue(next, currentMode, product);
      onProductDiscountChange?.({ type: currentMode, value: clamped });
    };

    return (
      <section className={styles.wrapper}>
        <div className={styles.item}>
          <p className={styles.itemNumber}>{index + 1}.</p>

          <section
            className={styles.itemName}
            onClick={() => handleEditProduct?.(product.id)}
          >
            <input type="text" value={product.title} readOnly />
            <EditIcon fontSize="small" />
          </section>

          {!editingDiscount ? (
            <button
              className={styles.itemDiscount}
              onClick={() => setEditingDiscount(true)}
              title="Add Discount"
            >
              Add Discount
            </button>
          ) : (
            <div className={styles.discountEditor}>
              <input
                type="number"
                min={0}
                max={valueMax}
                step={currentMode === "percent" ? 1 : 0.01}
                value={currentValue}
                onChange={(e) => handleValueChange(Number(e.target.value))}
                className={styles.discountValueButton}
                title={`Discount value (${currentMode})`}
              />

              <select
                value={currentMode}
                onChange={(e) =>
                  handleModeChange(e.target.value as DiscountType)
                }
                className={styles.discountModeDropdown}
                title="Discount type"
              >
                <option value="flat">Flat</option>
                <option value="percent">% Off</option>
              </select>

              {/* Commenting the Save Button - Can be Enabled if needed */}
              {/* <button
                type="button"
                className={styles.discountDone}
                onClick={() => setEditingDiscount(false)}
              >
                Done
              </button>
              */}
            </div>
          )}

          <button
            className={styles.itemRemove}
            onClick={() => handleRemoveProduct?.(product.id)}
          >
            X
          </button>
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
            <VariantRow
              key={variant.id}
              variant={variant}
              handleRemoveVariant={(id: number) => {
                handleRemoveVariant?.(id);
              }}
              variantDiscount={
                variantDiscounts?.[variant.id] ?? productDiscount
              }
              onVariantDiscountChange={(discount: Discount) =>
                onVariantDiscountChange?.(variant.id, discount)
              }
            />
          ))}
      </section>
    );
  }
};

export default ProductItem;
