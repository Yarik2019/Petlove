import dogIcon from '../../../assets/img/dog-icon.png';
import catIcon from '../../../assets/img/cat-icon.png';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

const ModalAttention = () => {
  const randomImage = useMemo(() => {
    const images = [dogIcon, catIcon];
    const index = Math.floor(Math.random() * images.length);
    return images[index];
  }, []);

  return (
    <div className='w-full max-w-[335px] px-5 py-10  bg-text-white rounded-[30px] p-10 md:max-w-[466px] md:p-15'>
      <div className='flex justify-center items-center rounded-full w-20 h-20 bg-brand-light mx-auto mb-5'>
        <img src={randomImage} alt='cat or dog' width={44} height={44} />
      </div>
      <h3 className='text-xl font-bold text-brand leading-5 -tracking-[-0.6px] text-center mb-5 md:text-2xl md:leading-6 md:-tracking-[0.72]'>
        Attention
      </h3>
      <p className='text-sm font-medium leading-4.5 -tracking-[0.28px] text-center mb-6'>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>
      <div className='w-full flex justify-center gap-2'>
        <NavLink
          className='p-3 w-full text-center max-w-[134px] rounded-[30px] text-text-white bg-brand text-sm font-bold leading-4.5 -tracking-[0.42px] hover:bg-hover transition-all duration-200 md:p-3.5 md:text-base md:leading-5 md:-tracking-[0.48px] md:max-w-[140px]'
          to='/login'
        >
          Log In
        </NavLink>
        <NavLink
          className='p-3 text-center w-full max-w-[130px] rounded-[30px] text-brand bg-brand-light text-sm font-bold leading-4.5 -tracking-[0.42px] hover:bg-hover-light transition-all duration-200 md:p-3.5 md:text-base md:leading-5 md:-tracking-[0.48px] md:max-w-[140px]'
          to='/register'
        >
          Registration
        </NavLink>
      </div>
    </div>
  );
};
export default ModalAttention;
