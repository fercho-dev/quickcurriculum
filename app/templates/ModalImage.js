import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set root for accessibility purposes

const ModalImage = ({ isOpen, onRequestClose, image, onSelect }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    <img src={image} alt="" className="w-full h-full object-contain" />
    <div className='flex justify-center gap-10'>
      <button onClick={onRequestClose} className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cerrar modal</button>
      <button onClick={onSelect} className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-700">Crear CV</button>
    </div>
  </Modal>
);

export default ModalImage;
