import * as Dialog from "@radix-ui/react-dialog";
import "./ModalStyles.css";

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Select Products</Dialog.Title>
        {children}
        <Dialog.Close asChild>
          <button className="DialogClose">Close</button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default Modal;
