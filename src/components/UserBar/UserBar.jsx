import { NavLink, useLocation } from 'react-router-dom';
import sprite from '../../assets/sprite.svg';
import { selectUserCurrentFull } from '../../redux/user/selectors.js';
import { useSelector } from 'react-redux';

const UserBar = () => {
  const userCurrentFull = useSelector(selectUserCurrentFull) || {};
  const location = useLocation();

  const isLocation = location.pathname === '/home';
  return (
    <div className='md:flex md:items-center md:gap-2'>
      <NavLink
        className='w-10 flex justify-center items-center h-10 bg-brand-light rounded-full cursor-pointer transition-all duration-300  hover:opacity-[0.8] md:w-12.5 md:h-12.5'
        to='/profile'
      >
        {userCurrentFull?.avatar ? (
          <img
            src={userCurrentFull?.avatar}
            alt={userCurrentFull?.name}
            className='rounded-full md:w-12.5 md:h-12.5'
            width='40'
            height='40'
          />
        ) : (
          <svg className='fill-brand stroke-brand' width='20' height='20'>
            <use href={`${sprite}#icon-user`}></use>
          </svg>
        )}
      </NavLink>
      <p
        className={
          isLocation
            ? 'hidden md:block md:text-xl text-text-white font-bold leading-5 -tracking-[0.6]'
            : 'hidden md:block md:text-xl font-bold leading-5 -tracking-[0.6]'
        }
      >
        {userCurrentFull ? userCurrentFull?.name : 'User'}
      </p>
    </div>
  );
};

export default UserBar;
