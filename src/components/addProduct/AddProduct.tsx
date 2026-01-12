import { Root, Trigger } from "@radix-ui/react-dialog";
import Modal from "../modal/Modal";
import ProductPicker from "../productPicker/ProductPicker";
import type { FetchProducts } from "../../utils/fetchProducts.interface";
import styles from "./AddProduct.module.css";
import { useState } from "react";

interface AddProductProps extends FetchProducts {
  confirmSelection: () => void;
  cancelSelection: () => void;
}

const AddProduct = ({
  selectedProducts,
  setSelectedProducts,
  selectedVariants,
  setSelectedVariants,
  products,
  loading,
  hasMore,
  loadNextPage,
  confirmSelection,
  cancelSelection,
}: AddProductProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    confirmSelection();
    setOpen(false);
  };

  const handleCancel = () => {
    cancelSelection();
    setOpen(false);
  };

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <button className={styles.addProductButton}>Add Product</button>
      </Trigger>
      <Modal handleConfirm={handleConfirm} handleCancel={handleCancel}>
        <div>
          <ProductPicker
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
      </Modal>
    </Root>
  );
};
export default AddProduct;
