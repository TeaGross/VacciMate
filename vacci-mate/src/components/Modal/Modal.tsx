import './Modal.scss';
import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
        previouslyFocusedElement.current = document.activeElement as HTMLElement;
        modalRef.current?.focus();
        }

        return () => {
        previouslyFocusedElement.current?.focus();
        };
    }, [isOpen]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            tabIndex={-1}
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
        >
            <header className="modal-header">
            {title && <h3 id="modal-title">{title}</h3>}
            <button
                className="modal-close"
                onClick={onClose}
                aria-label="Stäng dialog"
                type="button"
            >
                ✕
            </button>
            </header>

            <div className="modal-body">
            {children}
            </div>
        </div>
        </div>
    );
};
