import React from 'react';
import { Events } from '../Utils/types';

import './index.css';

type ModalProps = {
    open: boolean;
    modalEvent: Events | undefined;
    handleOnClick: (event: Events, state: boolean) => void;
    setIsModalOpen: (s: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({ open, modalEvent, handleOnClick, setIsModalOpen }) => {
    if (!open || !modalEvent) return null;
    return (
        <>
            <div className="modal">
                Do you want to sign up?
                <div className="button-container">
                    <button
                        className="button"
                        onClick={(e) => {
                            handleOnClick(modalEvent, true);
                            setIsModalOpen(false);
                        }}
                    >
                        Confirm
                    </button>
                    <button className="button" onClick={(e) => setIsModalOpen(false)}>
                        Cancel
                    </button>
                </div>
            </div>
            <div className="modal-overlay"></div>
        </>
    );
};

export default Modal;
