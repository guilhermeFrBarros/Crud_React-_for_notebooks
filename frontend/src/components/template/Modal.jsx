import React, { useState } from 'react';

import './Modal.css';

const Modal = (props) => {

  const { isOpen, setModalOpen, text } = props;

  if (isOpen) {
    return (
      <div id="teste">
        <div className="container999">
          <div className="modal">
            {text}
            <div className="button-container-modal">
              <div className="button-modal" onClick={setModalOpen}>Concluído</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Modal;