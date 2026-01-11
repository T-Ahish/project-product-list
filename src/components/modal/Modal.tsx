import * as Dialog from "@radix-ui/react-dialog";
import "./ModalStyles.css";

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title>Select Products</Dialog.Title>
        <Dialog.Description>{children}</Dialog.Description>
        <Dialog.Close asChild>
          <button>Close</button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default Modal;
