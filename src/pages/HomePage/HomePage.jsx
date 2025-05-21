import mobileImg from '../../assets/img/home-img-mobile.jpg';
import tabletImg from '../../assets/img/home-img-tablet.jpg';
import deskImg from '../../assets/img/home-img-desk.jpg';
import useMediaQuery from '../../hooks/useMediaQuery.js';

const HomePage = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  return (
    <section className='container'>
      <div className='py-2.5'>
        <div className='pt-29.5 px-5 pb-12.5 bg-brand rounded-[30px] md:px-8 md:pt-44.5 md:flex md:flex-col md:items-end md:pb-11 md:gap-8 xl:flex-row xl:gap-[73px] xl:px-16'>
          <h1 className='text-text-white text-[50px] leading-[48px] -tracking-[1.5px] mb-6 font-bold md:text-[80px] md:leading-[77px] md:-tracking-[2.4px] md:mb-0'>
            Take good <span className='text-border'>care</span> of your small
            pets
          </h1>
          <p className='text-sm font-medium leading-[18px] -tracking-[0.28px] text-text-white md:leading-[22px] md:-tracking-[0.36px] md:max-w-[255px] md:text-lg '>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
        <div>
          <img
            className='rounded-[30px]'
            src={isMobile ? mobileImg : isDesktop ? deskImg : tabletImg}
            alt='home img'
          />
        </div>
      </div>
    </section>
  );
};
export default HomePage;
