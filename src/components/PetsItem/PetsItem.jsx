import { formatNoticesDate } from '../../utils/formatDate.js';
import sprite from '../../assets/sprite.svg';

const PetsItem = ({ pet, onRemove }) => {
  const { _id, name, title, sex, species, birthday, imgURL } = pet || {};

  return (
    <li className='flex gap-3.5 p-4 border rounded-[20px] border-inputs md:w-[305px] md:p-5.5 xl:w-full xl:p-5 xl:gap-[25px]'>
      <img
        className='object-cover w-[66px] h-[66px] rounded-full md:w-[75px] md:h-[75px] xl:w-22.5 xl:h-22.5'
        src={imgURL}
        alt={name}
      />
      <div className='flex flex-col xl:w-full'>
        <div className='relative mb-2 xl:w-full xl:mt-3.5'>
          <h3 className='truncate block text-sm font-bold leading-4.5 max-w-[145px] xl:max-w-[243px]'>
            {title}
          </h3>
          <button
            className='absolute -top-1 -right-1 group rounded-full p-[7px] bg-brand-light cursor-pointer hover:bg-hover-light transition-all duration-200 md:-top-2.5 md:-right-2.5 xl:p-2.5 xl:-top-3 xl:right-0'
            type='button'
            onClick={() => onRemove(_id)}
          >
            <svg
              className='fill-transparent stroke-brand md:w-4.5 md:h-4.5 '
              width='16'
              height='16'
            >
              <use href={`${sprite}#icon-trash`}></use>
            </svg>
          </button>
        </div>
        <div className='flex items-center flex-wrap gap-2.5 '>
          <p className='flex flex-col text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] w-1/5'>
            Name
            <span className='truncate block text-xs text-text-dark'>
              {name}
            </span>
          </p>
          <p className='flex flex-col w-[61px] text-[10px] text-text-gray leading-3.5 -tracking-[0.2px] '>
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
        </div>
      </div>
    </li>
  );
};
export default PetsItem;
