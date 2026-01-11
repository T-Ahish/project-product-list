import { Root, Trigger } from "@radix-ui/react-dialog";
import Modal from "../modal/Modal";
import ProductPicker from "../productPicker/ProductPicker";

const AddProduct = () => {
  return (
    <Root>
      <Trigger>
        <button>Add Product</button>
      </Trigger>
      <Modal>
        <ProductPicker />
      </Modal>
    </Root>
  );
};
export default AddProduct;
