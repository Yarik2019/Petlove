import { useState } from 'react';
import Modal from '../Modal/Modal.jsx';
import ModalApproveAction from '../Modal/ModalApproveAction/ModalApproveAction.jsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/user/operations.js';
import { logoutCleanStateNotices } from '../../redux/notices/slice.js';
import { errToast, successfullyToast } from '../../utils/toast.js';

const LogOutBtn = ({ className, onCloseMenu, isMobileMenu }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hendleOpenModal = () => {
    setIsOpenModal(true);
  };

  const hendleCloseModal = () => {
    setIsOpenModal(false);
  };

  const hendleLogOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(logoutCleanStateNotices());
      hendleCloseModal();
      if (isMobileMenu) {
        onCloseMenu();
      }
      navigate('/login');
      successfullyToast('Goodbye :(');
    } catch (error) {
      errToast(error);
    }
  };

  return (
    <>
      <button className={className} type='button' onClick={hendleOpenModal}>
        LOG OUT
      </button>
      <Modal isOpen={isOpenModal} onClose={hendleCloseModal}>
        <ModalApproveAction
          onClose={hendleCloseModal}
          approveFunction={hendleLogOut}
          approveText={'Already leaving?'}
        />
      </Modal>
    </>
  );
};
export default LogOutBtn;
