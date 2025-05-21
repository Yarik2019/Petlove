import { useForm } from 'react-hook-form';
import sprite from '../../assets/sprite.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { loginUser } from '../../redux/user/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { orderLoginSchema } from '../../utils/formValidation.js';
import Title from '../Title/Title.jsx';
import { errToast, successfullyToast } from '../../utils/toast.js';
import { selectIsLoading } from '../../redux/user/selectors.js';
import Loader from '../Loader/Loader.jsx';

const LoginForm = () => {
  const isLoading = useSelector(selectIsLoading);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(orderLoginSchema),
    mode: 'onChange',
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async data => {
    try {
      await dispatch(loginUser(data)).unwrap();

      successfullyToast('Login is successfully');
    } catch (error) {
      errToast(error);
    }
  };

  const isValidEmail =
    touchedFields.email && !errors.email && getValues('email')?.trim() !== '';
  const isValidPassword =
    touchedFields.email &&
    !errors.password &&
    getValues('password')?.trim() !== '';

  return (
    <form
      className='bg-text-white px-5 py-15 rounded-[30px] md:py-17.5 md:px-35 xl:py-28.5 xl:px-21 xl:w-1/2 xl:pb-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title titleText={'Log in'} />
      <p className='text-[14px] font-medium mb-6 mt-3 md:mt-4 md:text-lg md:mb-8'>
        Welcome! Please enter your credentials to login to the platform:
      </p>
      <ul className='flex flex-col gap-2.5 mb-10 md:gap-4 md:mb-12.5'>
        <li>
          <label className='relative block'>
            <input
              className={`!text-sm font-medium leading-4.5 -tracking-[0.42px] md:!text-base md:leading-5 md:-tracking-[0.48px] border outline-none rounded-[30px] w-full p-3 md:p-4 ${
                errors.email
                  ? 'border-error'
                  : isValidEmail
                  ? 'border-success focus:border-success'
                  : 'border-inputs focus:border-brand'
              } hover:border-brand`}
              type='email'
              name='email'
              placeholder='Email'
              {...register('email')}
            />
            {errors.email && (
              <button
                type='button'
                onClick={() => resetField('email')}
                className='absolute top-3  right-3 md:top-4 md:right-4 cursor-pointer'
              >
                <svg
                  className='fill-transparent stroke-error md:w-5.5 md:h-5.5'
                  width='18'
                  height='18'
                >
                  <use href={`${sprite}#icon-cross-small`} />
                </svg>
              </button>
            )}
            {isValidEmail && (
              <div className='absolute top-3  right-3 md:top-4 md:right-4 cursor-pointer'>
                <svg
                  className='fill-transparent stroke-success md:w-5.5 md:h-5.5'
                  width='18'
                  height='18'
                >
                  <use href={`${sprite}#icon-check`} />
                </svg>
              </div>
            )}
            {errors.email && (
              <p className='text-error mt-0.5 text-[10px] ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                {errors.email.message}
              </p>
            )}
          </label>
        </li>
        <li>
          <label className='relative block'>
            <input
              className={`!text-sm font-medium leading-4.5 -tracking-[0.42px] md:!text-base md:leading-5 md:-tracking-[0.48px] border outline-none transition-all duration-200 rounded-[30px] w-full p-3 md:p-4 ${
                errors.password
                  ? 'border-error'
                  : isValidPassword
                  ? 'border-success'
                  : 'border-inputs'
              } hover:border-brand`}
              type={passwordVisible ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              {...register('password')}
            />
            {isValidPassword && (
              <div className='absolute top-3  right-9.5 md:top-4 md:right-12.5 cursor-pointer'>
                <svg
                  className='fill-transparent stroke-success md:w-5.5 md:h-5.5'
                  width='18'
                  height='18'
                >
                  <use href={`${sprite}#icon-check`} />
                </svg>
              </div>
            )}
            <button
              type='button'
              className='group absolute top-3 transition-all duration-200 right-3 cursor-pointer md:top-4 md:right-4'
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <svg
                  width='18'
                  height='18'
                  className={`fill-transparent md:w-5.5 md:h-5.5 ${
                    errors.password ? 'stroke-error' : 'stroke-brand'
                  } group-hover:stroke-hover`}
                >
                  <use href={`${sprite}#icon-eye-on`}></use>
                </svg>
              ) : (
                <svg
                  width='18'
                  height='18'
                  className={`fill-transparent md:w-5.5 md:h-5.5 ${
                    errors.password ? 'stroke-error' : 'stroke-brand'
                  } group-hover:stroke-hover`}
                >
                  <use href={`${sprite}#icon-eye-off`}></use>
                </svg>
              )}
            </button>
            {errors.password && (
              <p className='text-error mt-0.5  text-[10px] ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                {errors.password.message}
              </p>
            )}
            {isValidPassword && (
              <p className='text-success mt-0.5  text-[10px] ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                Password is secure
              </p>
            )}
          </label>
        </li>
      </ul>
      <div className='flex flex-col  w-full gap-3'>
        <button
          type='submit'
          disabled={isLoading}
          className='flex justify-center p-3 w-ful bg-brand rounded-[30px] font-bold text-text-white transition-all duration-200 hover:bg-hover cursor-pointer md:p-4.5'
        >
          {isLoading ? (
            <Loader
              height={'18'}
              width={'18'}
              color={'var(--color-text-white)'}
            />
          ) : (
            'LOG IN'
          )}
        </button>
        <p className='text-center text-xs text-text-gray font-medium md:text-sm'>
          Don&apos;t have an account?{' '}
          <NavLink
            className='text-brand transition-all duration-300 hover:text-hover hover:underline cursor-pointer'
            to='/register'
          >
            Register
          </NavLink>
        </p>
      </div>
    </form>
  );
};
export default LoginForm;
