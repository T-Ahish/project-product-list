import * as Dialog from "@radix-ui/react-dialog";
import "./ModalStyles.css";

const Modal = ({
  handleConfirm,
  handleCancel,
  children,
}: {
  handleConfirm: () => void;
  handleCancel: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />

      <Dialog.Content className="DialogContent">
        <header className="DialogHeader">
          <Dialog.Title className="DialogTitle">Select Products</Dialog.Title>

          <Dialog.Close asChild>
            <button className="DialogX" onClick={handleCancel}>
              ✕
            </button>
          </Dialog.Close>
        </header>

        <div className="DialogBody">{children}</div>

        <footer className="DialogFooter">
          <div className="DialogActions">
            <button className="btnSecondary" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btnPrimary" onClick={handleConfirm}>
              Add
            </button>
          </div>
        </footer>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default Modal;
