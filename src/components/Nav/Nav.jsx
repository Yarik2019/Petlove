import { NavLink, useLocation } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery.js';

const Nav = ({ header, onCloseMenu }) => {
  const location = useLocation();
  const isHeader = header === 'header';
  const isDesk = useMediaQuery('(min-width: 1280px)');

  const isLocation = location.pathname === '/home';

  const handleCloseClick = () => {
    if (!header) {
      onCloseMenu();
    }
  };

  return (
    <nav>
      <ul
        className={isHeader ? 'flex gap-2.5' : 'flex flex-col gap-2.5 max-w-30'}
      >
        <li>
          <NavLink
            onClick={handleCloseClick}
            className={
              isHeader || isLocation
                ? ({ isActive }) =>
                    isActive
                      ? `px-5 py-4 flex justify-center items-center font-medium leading-[18px] text-sm -tracking-[0.42]  border border-brand rounded-[30px]`
                      : isLocation && isDesk
                      ? 'px-5 py-4 flex justify-center items-center font-medium leading-[18px] text-sm -tracking-[0.42] border border-border text-text-white trnasition-all duration-200 hover:opacity-[0.8] rounded-[30px]'
                      : `px-5 py-4 flex justify-center items-center font-medium leading-[18px] text-sm -tracking-[0.42] border border-inputs rounded-[30px] trnasition-all duration-200 hover:border-brand`
                : ({ isActive }) =>
                    isActive
                      ? `py-3.5 px-5 block text-center border border-border rounded-[30px] w-full text-[14px] font-medium text-text-white`
                      : `py-3.5 px-5 block text-center border border-border-light rounded-[30px] w-full text-[14px] font-medium text-text-white`
            }
            to='/news'
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={handleCloseClick}
            className={
              isHeader || isLocation
                ? ({ isActive }) =>
                    isActive
                      ? `px-5 py-4 flex justify-center items-center font-medium leading-[18px] text-sm -tracking-[0.42]  border border-brand rounded-[30px]`
                      : isLocation && isDesk
                      ? 'px-5 py-4 flex justify-center items-center font-medium leading-[18px] text-sm -tracking-[0.42] border border-border text-text-white trnasition-all duration-200 hover:opacity-[0.8] rounded-[30px]'
                      : `px-5 py-4 flex justify-center items-center font-medium leading-[18px] text-sm -tracking-[0.42] border border-inputs rounded-[30px] trnasition-all duration-200 hover:border-brand`
                : ({ isActive }) =>
                    isActive
                      ? `py-3.5 px-5 block text-center border border-border rounded-[30px] w-full text-[14px] font-medium text-text-white`
                      : `py-3.5 px-5 block text-center border border-border-light rounded-[30px] w-full text-[14px] font-medium text-text-white`
            }
            to='/notices'
          >
            Find pet
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleCloseClick}
            className={
              isHeader || isLocation
                ? ({ isActive }) =>
                    isActive
                      ? `px-5 py-4 flex justify-center items-center font-medium leading-[18px] text-sm -tracking-[0.42]  border border-brand rounded-[30px]`
                      : isLocation && isDesk
                      ? 'px-5 py-4 flex justify-center items-center font-medium leading-[18px] text-sm -tracking-[0.42] border border-border text-text-white trnasition-all duration-200 hover:opacity-[0.8] rounded-[30px]'
                      : `px-5 py-4 flex justify-center items-center font-medium leading-[18px] text-sm -tracking-[0.42] border border-inputs rounded-[30px] trnasition-all duration-200 hover:border-brand`
                : ({ isActive }) =>
                    isActive
                      ? `py-3.5 px-5 block text-center border border-border rounded-[30px] w-full text-[14px] font-medium text-text-white`
                      : `py-3.5 px-5 block text-center border border-border-light rounded-[30px] w-full text-[14px] font-medium text-text-white`
            }
            to='/friends'
          >
            Our friends
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
