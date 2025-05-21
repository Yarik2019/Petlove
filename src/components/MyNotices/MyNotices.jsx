import { useState } from 'react';
import NoticesItem from '../NoticesItem/NoticesItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectUserCurrentFull,
} from '../../redux/user/selectors.js';
import { removeFavoritesById } from '../../redux/user/slice.js';
import { NavLink } from 'react-router-dom';
import { removeNoticeFavorite } from '../../redux/notices/operations.js';
import Modal from '../Modal/Modal.jsx';
import ModalApproveAction from '../Modal/ModalApproveAction/ModalApproveAction.jsx';
import { errToast, successfullyToast } from '../../utils/toast.js';
import Loader from '../Loader/Loader.jsx';

const MyNotices = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const userCurrentFull = useSelector(selectUserCurrentFull);
  const [idPetCard, setIdPetCard] = useState(null);
  const [approveOpenModal, setApproveOpenModal] = useState(false);

  const { noticesFavorites, noticesViewed } = userCurrentFull || {};
  const [activeTab, setActiveTab] = useState('favorites');

  const handleCloseApproveModal = () => {
    setApproveOpenModal(false);
  };

  const handleOpenApproveModal = id => {
    setApproveOpenModal(true);
    setIdPetCard(id);
  };

  const handleRemove = async id => {
    try {
      await dispatch(removeNoticeFavorite(id)).unwrap();
      dispatch(removeFavoritesById({ id }));

      successfullyToast('successfully deleted');
      handleCloseApproveModal();
    } catch (error) {
      errToast(error);
    }
  };
  return (
    <div className='xl:mt-10 xl:w-full'>
      <div className='flex gap-2.5 mb-5 md:gap-2'>
        <button
          onClick={() => setActiveTab('favorites')}
          className={
            activeTab === 'favorites'
              ? 'p-3 bg-brand rounded-[30px] text-text-white !text-sm font-medium leading-4 -tracking-[0.42px] md:p-3.5 md:!text-base md:leading-5 md:-tracking-[0.48px]'
              : 'p-3 bg-text-white rounded-[30px] text-text-dark !text-sm font-medium leading-4 -tracking-[0.42px] cursor-pointer hover:bg-hover-light transition-all duration-200 md:p-3.5 md:!text-base md:leading-5 md:-tracking-[0.48px]'
          }
        >
          My favorites pets
        </button>
        <button
          onClick={() => setActiveTab('viewed')}
          className={
            activeTab === 'viewed'
              ? 'py-3 px-10 bg-brand rounded-[30px] text-text-white !text-sm font-medium leading-4 -tracking-[0.42px] md:py-3.5 md:px-11 md:!text-base md:leading-5 md:-tracking-[0.48px]'
              : 'py-3 px-10 bg-text-white rounded-[30px] text-text-dark !text-sm font-medium leading-4 -tracking-[0.42px] cursor-pointer hover:bg-hover-light transition-all duration-200 md:py-3.5 md:px-11 md:!text-base md:leading-5 md:-tracking-[0.48px]'
          }
        >
          Viewed
        </button>
      </div>

      {(activeTab === 'favorites' &&
        Array.isArray(noticesFavorites) &&
        noticesFavorites.length === 0) ||
      (activeTab === 'viewed' &&
        Array.isArray(noticesViewed) &&
        noticesViewed.length === 0) ? (
        <div className='mt-15 mb-20 md:mt-[160px] md:mb-[120px] xl:w-[664px]'>
          <p className='text-sm  text-center font-medium leading-4.5 -tracking-[0.28px] md:max-w-[458px] md:mx-auto  md:text-base md:leading-5 md:-tracking-[0.32px] '>
            Oops,{' '}
            <NavLink
              to='/notices'
              className='text-brand font-bold cursor-pointer'
            >
              looks like there aren&apos;t any furries
            </NavLink>{' '}
            on our adorable page yet. Do not worry! View your pets on the
            &#39;&#39;find your favorite pet&#39;&#39; page and add them to your
            favorites.
          </p>
        </div>
      ) : isLoading ? (
        <div className='flex justify-center h-[130px] items-center xl:w-[440px]'>
          <Loader height={'40'} width={'40'} color={'var(--color-brand)'} />
        </div>
      ) : (
        <ul className='flex flex-col gap-5 md:flex-row md:flex-wrap xl:gap-6'>
          {(activeTab === 'favorites' ? noticesFavorites : noticesViewed)?.map(
            item => (
              <NoticesItem
                key={item._id}
                dataItem={item}
                profilePage={true}
                viewed={activeTab === 'viewed'}
                onRemove={
                  activeTab === 'favorites'
                    ? id => handleOpenApproveModal(id)
                    : undefined
                }
              />
            )
          )}
        </ul>
      )}
      <Modal isOpen={approveOpenModal} onClose={handleCloseApproveModal}>
        <ModalApproveAction
          onClose={handleCloseApproveModal}
          approveFunction={handleRemove}
          id={idPetCard}
          approveText={'Are you sure you want to remove from favorites?'}
        />
      </Modal>
    </div>
  );
};
export default MyNotices;
