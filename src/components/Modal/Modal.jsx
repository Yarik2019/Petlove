import { useEffect } from 'react';
import sprite from '../../assets/sprite.svg';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('noScroll');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('noScroll');
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className='fixed top-0 left-0 w-screen h-screen bg-text-gray flex justify-center items-center z-50'
      onClick={onClose}
    >
      <div
        className='relative w-max overflow-hidden'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='absolute group top-5 right-5 cursor-pointer hover'
          onClick={onClose}
        >
          <svg
            className='stroke-text-dark group-hover:stroke-hover transition-all duration-200'
            width={24}
            height={24}
          >
            <use href={`${sprite}#icon-cross-small`} />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
