import { NavLink, useLocation } from 'react-router-dom';
import sprite from '../../assets/sprite.svg';

const Logo = () => {
  const location = useLocation();

  const isLocation = location.pathname === '/home';

  const isStartScreen = location.pathname === '/';

  return (
    <div>
      <NavLink
        to='/home'
        className={
          isLocation
            ? 'flex text-xl gap-0.5 font-bold text-text-white items-center md:text-[28px]'
            : isStartScreen
            ? 'flex !text-[50px] gap-0.5 font-bold text-text-white items-center  -tracking-[2px] md:!text-[100px] md:-tracking-[4px]'
            : 'flex text-xl font-bold items-baseline md:text-[28px] md:gap-0.5'
        }
      >
        petl
        <span>
          <svg
            width='17'
            height='17'
            className={
              isLocation
                ? 'stroke-text-white fill-text-white'
                : isStartScreen
                ? 'stroke-brand fill-brand w-[44px] h-[44px] md:w-[82px] md:h-[82px]'
                : 'stroke-brand fill-brand md:w-[19px] md:h-[19px] '
            }
          >
            <use href={`${sprite}#icon-heart`}></use>
          </svg>
        </span>
        ve
      </NavLink>
    </div>
  );
};
export default Logo;
