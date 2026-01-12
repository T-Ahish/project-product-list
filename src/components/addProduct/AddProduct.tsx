import { Root, Trigger } from "@radix-ui/react-dialog";
import Modal from "../modal/Modal";
import ProductPicker from "../productPicker/ProductPicker";
import type { FetchProducts } from "../../utils/fetchProducts.interface";
import styles from "./AddProduct.module.css";

const AddProduct = ({
  selectedProducts,
  setSelectedProducts,
  selectedVariants,
  setSelectedVariants,
  products,
  loading,
  hasMore,
  loadNextPage,
}: FetchProducts) => {
  return (
    <Root>
      <Trigger asChild>
        <button className={styles.addProductButton}>Add Product</button>
      </Trigger>
      <Modal>
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
