import { NavLink } from 'react-router-dom';
import sprite from '../../assets/sprite.svg';

const AddPet = () => {
  return (
    <NavLink
      to='/add-pet'
      className='flex justify-center gap-1 py-2.5 px-4 bg-brand rounded-[30px] hover:bg-hover text-text-white text-sm font-medium leading-4.5 -tracking-[0.42px] md:text-base md:leading-5 md:-tracking-[0.48px] md:px-5'
    >
      Add pet
      <svg className='fill-text-white stroke-text-white' width='18' height='18'>
        <use href={`${sprite}#icon-plus`}></use>
      </svg>
    </NavLink>
  );
};
export default AddPet;
