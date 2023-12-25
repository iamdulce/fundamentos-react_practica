import Button from "./Button";
import "./Modal.css";

const Modal = ({ show, onClose, onConfirm }) => {
    return (
        <div className={`modal ${show ? "show" : ""}`}>
            <div className="modal-content">
                <p>Are you sure you want to delete this ad?</p>
                <Button onClick={onConfirm}>Yes</Button>
                <Button onClick={onClose}>No</Button>
            </div>
        </div>
    );
};

export default Modal;
