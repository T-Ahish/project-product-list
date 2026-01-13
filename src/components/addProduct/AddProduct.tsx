import { Root, Trigger } from "@radix-ui/react-dialog";
import Modal from "../modal/Modal";
import ProductPicker from "../productPicker/ProductPicker";
import type { FetchProducts } from "../../utils/fetchProducts.interface";
import styles from "./AddProduct.module.css";

interface AddProductProps extends FetchProducts {
  isOpen: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  isOpen,
  handleCancel,
  handleConfirm,
  setIsOpen,
}: AddProductProps) => {
  return (
    <Root open={isOpen} onOpenChange={setIsOpen}>
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
