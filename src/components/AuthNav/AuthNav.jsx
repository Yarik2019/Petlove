import { NavLink, useLocation } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery.js';

const AuthNav = ({ header, onCloseMenu }) => {
  const location = useLocation();
  const isDesk = useMediaQuery('(min-width: 1280px)');

  const isHeader = header === 'header';

  const isLocation = location.pathname === '/home';

  const handleCloseClick = () => {
    if (!header) {
      onCloseMenu();
    }
  };

  return (
    <>
      <ul
        className={
          isHeader
            ? 'flex items-center gap-2'
            : isLocation
            ? 'flex flex-col gap-2 w-full md:flex-row md:justify-center'
            : 'flex flex-col gap-2 w-full md:flex-row md:justify-center'
        }
      >
        <li>
          <NavLink
            onClick={handleCloseClick}
            className={
              isHeader || isLocation
                ? isLocation && isDesk
                  ? 'px-9 py-4 flex justify-center items-center font-medium leading-[18px] text-sm -tracking-[0.42] border border-border text-text-white hover:opacity-[0.8] rounded-[30px]'
                  : 'py-4 flex justify-center items-center px-9 bg-brand text-text-white rounded-[30px] transition-all duration-200 hover:bg-hover font-bold'
                : 'py-3  text-center text-[14px] text-text-white block rounded-[30px] border border-border md:px-9 md:py-4'
            }
            to='/login'
          >
            LOG IN
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={handleCloseClick}
            className={
              isHeader || isLocation
                ? 'py-4 px-5 flex justify-center items-center text-center  rounded-[30px] bg-brand-light transition-all duration-200 hover:bg-hover-light text-brand font-bold'
                : 'py-3 block text-center text-[14px] rounded-[30px] bg-brand-light text-brand md:px-5 md:py-4'
            }
            to='/register'
          >
            REGISTRATION
          </NavLink>
        </li>
      </ul>
    </>
  );
};
export default AuthNav;
