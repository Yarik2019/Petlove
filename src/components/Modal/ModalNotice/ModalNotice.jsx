import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavorites,
  selectNoticeById,
} from '../../../redux/notices/selectors.js';
import { useEffect } from 'react';
import {
  addNoticeFavorite,
  getNoticeById,
  removeNoticeFavorite,
} from '../../../redux/notices/operations.js';
import { getStarCount } from '../../../utils/getStarCount.js';
import sprite from '../../../assets/sprite.svg';
import { formatNoticesDate } from '../../../utils/formatDate.js';

const ModalNotice = ({ id, profilePage, onRemove }) => {
  const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNoticeById(id));
  }, [dispatch, id]);

  const {
    category,
    comment,
    birthday,
    imgURL,
    name,
    price,
    sex,
    title,
    user,
    popularity,
    species,
  } = useSelector(selectNoticeById) || {};

  const starsCount = getStarCount(popularity);
  const isFavorite = favorites.includes(id);

  const handleFavoriteClick = () => {
    if (profilePage && isFavorite) {
      onRemove(id);
      return;
    }

    if (isFavorite) {
      dispatch(removeNoticeFavorite(id));
    } else {
      dispatch(addNoticeFavorite(id));
    }
  };

  return (
    <div className='w-full max-w-[335px] px-7 py-10 bg-text-white  rounded-[30px] flex flex-col justify-center md:w-[473px] md:max-w-[473px] md:px-19 '>
      <div className='relative mb-5 m-auto md:mb-4'>
        <p className='absolute left-0 top-0 px-3.5 py-2 bg-brand-light rounded-[30px] text-brand font-medium text-xs md:text-sm leading-4 md:leading-4.5 -tracking-[0.24px] md:-tracking-[0.28px]'>
          {category}
        </p>
        <img
          className='rounded-full md:w-[150px] md:h-[150px]'
          src={imgURL}
          alt={`${name} image`}
          width={120}
          height={120}
        />
      </div>
      <h3 className='font-bold leading-5 mb-2.5 text-center md:text-lg md:leading-6'>
        {title}
      </h3>
      <div className='flex gap-1 justify-center items-center mb-6 md:mb-5'>
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className={
              index < starsCount
                ? 'fill-brand stroke-brand'
                : 'fill-disabled stroke-disabled'
            }
            width='16'
            height='16'
          >
            <use href={`${sprite}#icon-star`} />
          </svg>
        ))}
        <p className='font-medium text-sm leading-5'>{popularity}</p>
      </div>
      <div className='flex justify-around mb-4'>
        <p className='flex flex-col items-center gap-1 text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] w-1/5'>
          Name
          <span className='truncate block text-xs text-text-dark'>{name}</span>
        </p>
        <p className='flex flex-col items-center gap-1 text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] w-1/5'>
          Birthday
          <span className='text-xs text-text-dark'>
            {birthday ? formatNoticesDate(birthday) : 'unknown'}
          </span>
        </p>
        <p className='flex flex-col items-center gap-1 text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] w-1/5'>
          Sex
          <span className='text-xs text-text-dark'>{sex}</span>
        </p>
        <p className='flex flex-col items-center gap-1 text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] w-1/5'>
          Species
          <span className='text-xs text-text-dark'>{species}</span>
        </p>
      </div>
      <p className='text-sm font-medium  leading-4.5 -tracking-[0.28] text-center mb-8'>
        {comment}
      </p>
      <p className='text-center font-bold leading-5 mb-5 md:text-lg md:leading-6'>
        $ {price ? price : 'Free'}
      </p>
      <div className='w-full flex gap-2.5'>
        <button
          className='group flex justify-center gap-2 w-full max-w-1/2 rounded-full p-3 leading-5 -tracking-[0.48] transition-all duration-200 bg-brand text-text-white cursor-pointer md:p-3.5 hover:bg-hover'
          type='button'
          onClick={handleFavoriteClick}
        >
          {profilePage ? 'Delete' : 'Add to'}
          {profilePage ? (
            <svg
              className={'fill-transparent stroke-text-white'}
              width='18'
              height='18'
            >
              <use href={`${sprite}#icon-trash`}></use>
            </svg>
          ) : (
            <svg
              className={
                isFavorite
                  ? 'transition-all duration-200 group-hover:fill-hover fill-text-white stroke-text-white'
                  : 'transition-all duration-200 group-hover:fill-text-white fill-transparent stroke-text-white'
              }
              width='18'
              height='18'
            >
              <use href={`${sprite}#icon-heart`}></use>
            </svg>
          )}
        </button>
        <a
          href={`mailto:${user?.email}`}
          className='flex justify-center gap-2 transition-all duration-200 w-full max-w-1/2 rounded-full p-3 bg-brand-light leading-5 -tracking-[0.48]  text-brand cursor-pointer hover:bg-hover hover:text-white'
        >
          Contact
        </a>
      </div>
    </div>
  );
};
export default ModalNotice;
