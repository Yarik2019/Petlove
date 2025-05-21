import Nav from '../Nav/Nav.jsx';
import AuthNav from '../AuthNav/AuthNav.jsx';
import UserNav from '../UserNav/UserNav.jsx';
import Logo from '../Logo/Logo.jsx';
import sprite from '../../assets/sprite.svg';
import { useState } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import UserBar from '../UserBar/UserBar.jsx';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/user/selectors.js';

const Header = () => {
  const isLogin = useSelector(selectIsLoggedIn);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isLocation = location.pathname === '/home';

  return (
    <header
      className={
        isLocation
          ? 'max-w-[375px] mx-auto px-[20px]  md:max-w-[768px] xl:max-w-[1280px] relative '
          : 'max-w-[375px] mx-auto px-[20px] mt-7 md:px-[32px] md:max-w-[768px] xl:max-w-[1280px] xl:px-16'
      }
    >
      <div
        className={
          isLocation
            ? 'flex justify-between w-full px-10 items-center xl:gap-[313px] xl:w-full xl:justify-start absolute mt-7 right-0 left-0 md:px-16 xl:px-24'
            : 'flex justify-between items-center xl:gap-[313px] xl:w-full xl:justify-start'
        }
      >
        <Logo />
        {isDesktop ? (
          <div className='w-full flex items-center justify-between'>
            <Nav header={'header'} />
            {isLogin ? <UserNav /> : <AuthNav header={'header'} />}
          </div>
        ) : (
          <div className='flex gap-3'>
            {!isDesktop && isLogin && isMobile ? (
              <UserBar />
            ) : isLogin ? (
              <UserNav />
            ) : (
              !isLocation && !isMobile && <AuthNav header={'header'} />
            )}
            <button type='button' onClick={() => setIsOpen(!isOpen)}>
              <svg
                width='32'
                height='32'
                className={
                  isLocation ? 'stroke-text-white' : 'stroke-text-dark'
                }
              >
                <use href={`${sprite}#icon-menu-burger`}></use>
              </svg>
            </button>
          </div>
        )}
      </div>
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isLogin={isLogin}
      />
    </header>
  );
};
export default Header;
