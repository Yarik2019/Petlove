import { useState } from 'react';
import sprite from '../../assets/sprite.svg';
import Modal from '../Modal/Modal.jsx';
import ModalEditUser from '../Modal/ModalEditUser/ModalEditUser.jsx';

const EditUserBtn = ({ userBlock }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      {!userBlock ? (
        <button
          type='button'
          className='p-2.5 bh-brand-light rounded-full bg-brand-light hover:bg-hover-light cursor-pointer transition-all duration-200'
          onClick={handleOpenEditModal}
        >
          <svg className='fill-transparent stroke-brand' width='18' height='18'>
            <use href={`${sprite}#icon-edit`}></use>
          </svg>
        </button>
      ) : (
        <button
          type='button'
          className='underline [text-decoration-skip-ink:none] cursor-pointer !text-xs font-medium leading-4 -tracking-[0.24px] md:!text-sm md:leading-4.5 md:-tracking-[0.28px] transition-all duration-200 hover:text-hover'
          onClick={handleOpenEditModal}
        >
          Upload photo
        </button>
      )}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <ModalEditUser onClose={handleCloseEditModal} />
      </Modal>
    </>
  );
};
export default EditUserBtn;
