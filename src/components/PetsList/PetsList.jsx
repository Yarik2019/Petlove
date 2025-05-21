import { useDispatch, useSelector } from 'react-redux';
import { removePets } from '../../redux/user/operations.js';
import { removeUserPetById } from '../../redux/user/slice.js';
import { errToast, successfullyToast } from '../../utils/toast.js';
import Modal from '../Modal/Modal.jsx';
import PetsItem from '../PetsItem/PetsItem.jsx';
import { useState } from 'react';
import ModalApproveAction from '../Modal/ModalApproveAction/ModalApproveAction.jsx';
import { selectIsLoading } from '../../redux/user/selectors.js';
import Loader from '../Loader/Loader.jsx';

const PetsList = ({ pets }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [idPetCard, setIdPetCard] = useState(null);
  const [approveOpenModal, setApproveOpenModal] = useState(false);

  const handleCloseApproveModal = () => {
    setApproveOpenModal(false);
  };

  const handleOpenApproveModal = id => {
    setApproveOpenModal(true);
    setIdPetCard(id);
  };

  const handleRemove = async id => {
    try {
      await dispatch(removePets(id)).unwrap();
      dispatch(removeUserPetById(id));

      setApproveOpenModal(false);
      successfullyToast('successfully deleted');
    } catch (error) {
      errToast(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center h-[130px] items-center md:h-[142px] xl:h-[132px] xl:w-[440px]'>
          <Loader height={'40'} width={'40'} color={'var(--color-brand)'} />
        </div>
      ) : pets.length > 0 ? (
        <ul className='flex flex-col gap-3.5 md:flex-row md:flex-wrap md:gap-3.5 xl:w-[440px]'>
          {pets?.map(pet => (
            <PetsItem
              key={pet._id}
              pet={pet}
              onRemove={id => handleOpenApproveModal(id)}
            />
          ))}
        </ul>
      ) : (
        <div>
          <div className='flex justify-center h-[130px] md:h-[142px] xl:h-[132px] items-center xl:w-[440px]'>
            <p>Your pets will be here. Please add them.</p>
          </div>
        </div>
      )}
      <Modal isOpen={approveOpenModal} onClose={handleCloseApproveModal}>
        <ModalApproveAction
          onClose={handleCloseApproveModal}
          approveFunction={handleRemove}
          id={idPetCard}
          approveText={'Are you sure you want to remove from favorites?'}
        />
      </Modal>
    </>
  );
};
export default PetsList;
