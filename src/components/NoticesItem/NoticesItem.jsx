import { useState } from 'react';
import sprite from '../../assets/sprite.svg';
import { formatNoticesDate } from '../../utils/formatDate.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/user/selectors.js';
import Modal from '../Modal/Modal.jsx';
import ModalAttention from '../Modal/ModalAttention/ModalAttention.jsx';
import ModalNotice from '../Modal/ModalNotice/ModalNotice.jsx';
import {
  addNoticeFavorite,
  removeNoticeFavorite,
} from '../../redux/notices/operations.js';
import { selectFavorites } from '../../redux/notices/selectors.js';
import { removeNoticesById } from '../../redux/notices/slice.js';

const NoticesItem = ({ dataItem, profilePage, viewed, onRemove }) => {
  const isLogin = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const [isModalInfo, setIsModalInfo] = useState(false);

  const {
    _id,
    imgURL,
    name,
    title,
    popularity,
    birthday,
    sex,
    species,
    category,
    comment,
    price,
  } = dataItem;

  const isFavorite = favorites.includes(_id);

  const handleModalInfoOpen = () => {
    setIsModalInfo(true);
  };

  const handleModalInfoClose = () => {
    setIsModalInfo(false);
    dispatch(removeNoticesById());
  };

  const handleFavoriteClick = () => {
    if (!isLogin) {
      setIsModalInfo(true);
      return;
    }

    if (profilePage && isFavorite) {
      onRemove(_id);
      return;
    }

    if (isFavorite) {
      dispatch(removeNoticeFavorite(_id));
    } else {
      dispatch(addNoticeFavorite(_id));
    }
  };

  return (
    <li
      className={
        profilePage
          ? 'p-6 bg-text-white w-full rounded-2xl max-w-[335px] md:max-w-[342px] xl:max-w-[320px] xl:p-3.5'
          : 'p-6 bg-text-white w-full rounded-2xl max-w-[335px] md:max-w-[342px] xl:max-w-[362px]'
      }
    >
      <img
        className='w-full  h-[178px] object-cover rounded-2xl mb-6 md:h-[226px]'
        src={imgURL}
        alt={name}
      />
      <div className='flex justify-between mb-2'>
        <h3 className='truncate block font-bold leading-5 md:text-lg md:leading-6'>
          {title}
        </h3>
        <p className='flex gap-0.5  items-center font-medium text-sm leading-4.5'>
          <svg className='fill-brand stroke-brand' width='16' height='16'>
            <use href={`${sprite}#icon-star`}></use>
          </svg>
          {popularity}
        </p>
      </div>
      <div className='flex items-center justify-center gap-3.5 mb-4'>
        <p className='flex flex-col text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] w-1/5'>
          Name
          <span className='truncate block text-xs text-text-dark'>{name}</span>
        </p>
        <p className='flex flex-col text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] w-1/5'>
          Birthday
          <span className='text-xs text-text-dark'>
            {birthday ? formatNoticesDate(birthday) : 'unknown'}
          </span>
        </p>
        <p className='flex flex-col text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] w-1/5'>
          Sex
          <span className='text-xs text-text-dark'>{sex}</span>
        </p>
        <p className='flex flex-col text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] w-1/5'>
          Species
          <span className='text-xs text-text-dark'>{species}</span>
        </p>
        <p className='flex flex-col text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] w-1/5'>
          Category
          <span className='text-xs text-text-dark'>{category}</span>
        </p>
      </div>
      <p className='text-sm font-medium leading-4.5 h-9 -tracking-[0.28px] mb-4 md:mb-6'>
        {comment}
      </p>
      <p className='font-bold leading-4 mb-3 md:text-lg md:leading-6'>
        $ {price ? price : 'Free'}
      </p>
      <div className='flex gap-2.5'>
        <button
          className='p-3.5 w-full bg-brand rounded-[30px] text-text-white text-sm font-medium leading-4.5 -tracking-[0.42px] cursor-pointer hover:bg-hover transition-all duration-200 '
          type='button'
          onClick={handleModalInfoOpen}
        >
          Learn more
        </button>
        {!viewed && (
          <button
            className='group rounded-full p-3.5 bg-brand-light cursor-pointer hover:bg-hover-light transition-all duration-200'
            type='button'
            onClick={handleFavoriteClick}
          >
            {profilePage ? (
              <svg
                className={
                  isFavorite
                    ? 'fill-transparent stroke-brand'
                    : 'fill-transparent stroke-brand'
                }
                width='18'
                height='18'
              >
                <use href={`${sprite}#icon-trash`}></use>
              </svg>
            ) : (
              <svg
                className={
                  isFavorite
                    ? 'group-hover:fill-hover fill-brand stroke-brand'
                    : 'group-hover:fill-brand fill-transparent stroke-brand'
                }
                width='18'
                height='18'
              >
                <use href={`${sprite}#icon-heart`}></use>
              </svg>
            )}
          </button>
        )}
      </div>
      <Modal isOpen={isModalInfo} onClose={handleModalInfoClose}>
        {isLogin ? (
          <ModalNotice
            onClose={handleModalInfoClose}
            id={_id}
            profilePage={profilePage}
            onRemove={onRemove}
          />
        ) : (
          <ModalAttention onClose={handleModalInfoClose} />
        )}
      </Modal>
    </li>
  );
};
export default NoticesItem;
