import { NavLink } from 'react-router-dom';
import notFoundImg from '../../assets/img/not-found-pet.png';
import notFoundImgTab from '../../assets/img/not-found-pet-tablet.png';
import useMediaQuery from '../../hooks/useMediaQuery.js';

const NotFoundPage = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  return (
    <section className='max-w-[375px] mx-auto py-3 px-5 md:max-w-[768px] md:px-8 xl:max-w-[1280px] flex items-center justify-center md:py-8'>
      <div className='flex flex-col justify-center items-center min-h-[85vh] md:min-h-[80vh]  w-full h-full bg-brand rounded-[30px]'>
        <div className='flex  items-center mb-5 md:mb-12.5'>
          <p className='text-[120px] text-text-white font-bold md:text-[300px]'>
            4
          </p>
          <img
            className='w-[109px] h-[109px] rounded-full bg-border-light md:w-[280px] md:h-[280px]'
            src={isMobile ? notFoundImg : notFoundImgTab}
            alt='Not Found Cat'
          />
          <p className='text-[120px] text-text-white font-bold md:text-[300px]'>
            4
          </p>
        </div>
        <p className='font-bold text-text-white leading-5 -tracking-[0.48px] mb-5 md:text-2xl md:leading-7 md:-tracking-[0.72px]'>
          Ooops! This page not found :&#40;
        </p>
        <NavLink
          to='/home'
          className='py-3 px-7.5 bg-brand-light rounded-[30px] !text-sm font-bold leading-4.5 -tracking-[0.42px] text-brand transition-all duration-200 hover:bg-hover-light md:text-base md:leading-5'
        >
          To home page
        </NavLink>
      </div>
    </section>
  );
};
export default NotFoundPage;
