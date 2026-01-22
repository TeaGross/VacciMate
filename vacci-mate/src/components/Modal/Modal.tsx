import './Modal.scss';
import type { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    }

    export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
        >
            <header className="modal-header">
            {title && <h3>{title}</h3>}
            <button className="modal-close" onClick={onClose}>✕</button>
            </header>

            <div className="modal-body">
            {children}
            </div>
        </div>
        </div>
    );
};
