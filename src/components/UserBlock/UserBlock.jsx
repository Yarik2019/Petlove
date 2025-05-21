import { useSelector } from 'react-redux';
import sprite from '../../assets/sprite.svg';
import { selectIsLoading } from '../../redux/user/selectors.js';
import EditUserBtn from '../EditUserBtn/EditUserBtn.jsx';
import Loader from '../Loader/Loader.jsx';

const UserBlock = ({ userCurrentFull }) => {
  const isLoading = useSelector(selectIsLoading);
  const { avatar, name, email, phone } = userCurrentFull || {};

  return (
    <div className='mb-10 -mt-0.5 w-full'>
      {isLoading ? (
        <div className='flex flex-col justify-center items-center mb-7'>
          <div className='flex justify-center items-center mt-4.5 p-[27px] rounded-full bg-brand-light w-[94px] h-[94px] md:w-[110px] md:h-[110px] md:-mt-9'>
            <Loader height={'40'} width={'40'} color={'var(--color-brand)'} />
          </div>
        </div>
      ) : avatar ? (
        <img
          src={avatar}
          alt={name}
          className=' rounded-full w-[94px] mb-7 mt-4.5 mx-auto md:w-[110px] md:-mt-9'
        />
      ) : (
        <div className='flex flex-col justify-center items-center gap-2 mb-7'>
          <div className='p-[27px] flex justify-center items-center rounded-full bg-brand-light w-[94px] md:w-[110px] md:h-[110px] md:-mt-9'>
            <svg
              className='fill-brand stroke-brand md:w-12.5 md:h-12.5'
              width='40'
              height='40'
            >
              <use href={`${sprite}#icon-user`}></use>
            </svg>
          </div>
          <EditUserBtn userBlock={true} />
        </div>
      )}
      <h2 className='font-bold leading-5 mb-5 md:text-lg md:leading-6'>
        My information
      </h2>
      {isLoading ? (
        <div className='flex justify-center h-[152px] md:h-[118px] xl:h-[184px] items-center xl:w-[440px]'>
          <Loader height={'40'} width={'40'} color={'var(--color-brand)'} />
        </div>
      ) : (
        <ul className='flex flex-col gap-2.5 md:flex-row md:flex-wrap md:gap-3.5 xl:w-[440px]'>
          <li
            className={
              name
                ? 'p-3 border border-brand rounded-[30px]  md:w-[305px] md:p-4 xl:w-full'
                : 'p-3 border border-inputs rounded-[30px] md:w-[305px] md:p-4 xl:w-full'
            }
          >
            <p className='text-sm font-medium leading-4.5 -tracking-[0.42px]'>
              {name}
            </p>
          </li>
          <li
            className={
              email
                ? 'p-3 border border-brand rounded-[30px]  md:w-[305px] md:p-4 xl:w-full'
                : 'p-3 border border-inputs rounded-[30px] md:w-[305px] md:p-4 xl:w-full'
            }
          >
            <p className='text-sm font-medium leading-4.5 -tracking-[0.42px]'>
              {email}
            </p>
          </li>
          <li
            className={
              phone
                ? 'p-3 border border-brand rounded-[30px] md:w-[305px] md:p-4 xl:w-full'
                : 'p-3 border border-inputs rounded-[30px] md:w-[305px] md:p-4 xl:w-full'
            }
          >
            <p className='text-sm font-medium leading-4.5 -tracking-[0.42px]'>
              {phone ? phone : '+380'}
            </p>
          </li>
        </ul>
      )}
    </div>
  );
};
export default UserBlock;
