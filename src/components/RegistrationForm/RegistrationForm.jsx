import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../redux/user/operations.js';
import { useState } from 'react';
import sprite from '../../assets/sprite.svg';
import { orderRegistrationSchema } from '../../utils/formValidation.js';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../Title/Title.jsx';
import { errToast, successfullyToast } from '../../utils/toast.js';
import { selectIsLoading } from '../../redux/user/selectors.js';
import Loader from '../Loader/Loader.jsx';

const RegistrationForm = () => {
  const isLoading = useSelector(selectIsLoading);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    resetField,
    getValues,
  } = useForm({
    resolver: yupResolver(orderRegistrationSchema),
    mode: 'onChange',
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisible(!repeatPasswordVisible);
  };

  const onSubmit = async data => {
    const { name, email, password } = data;
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      successfullyToast('Registration is successfully');
    } catch (error) {
      errToast(error);
    }
  };

  const isValidName =
    touchedFields.name && !errors.name && getValues('name')?.trim() !== '';
  const isValidEmail =
    touchedFields.email && !errors.email && getValues('email')?.trim() !== '';
  const isValidPassword =
    touchedFields.email &&
    !errors.password &&
    getValues('password')?.trim() !== '';
  const isValidconfirmPassword =
    touchedFields.confirmPassword &&
    !errors.confirmPassword &&
    getValues('confirmPassword')?.trim() !== '';

  return (
    <form
      className='bg-text-white px-5 py-5 rounded-[30px] md:py-6.5 md:px-35 xl:w-1/2 xl:py-17 xl:px-21 xl:pb-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title titleText={'Registration'} form={true} />
      <p className='text-[14px] font-medium mb-5 mt-3 md:mt-4 md:text-lg md:mb-8'>
        Thank you for your interest in our platform.
      </p>
      <ul className='flex flex-col gap-2.5 mb-6 md:gap-4 xl:mb-8.5'>
        <li>
          <label className='relative block'>
            <input
              className={`!text-sm font-medium leading-4.5 -tracking-[0.42px] md:!text-base md:leading-5 md:-tracking-[0.48px] border outline-none rounded-[30px] w-full p-3 md:p-4 ${
                errors.name
                  ? 'border-error'
                  : isValidName
                  ? 'border-success focus:border-success'
                  : 'border-inputs focus:border-brand'
              } hover:border-brand`}
              type='text'
              name='name'
              placeholder='Name'
              {...register('name')}
            />
            {errors.name && (
              <button
                type='button'
                onClick={() => resetField('name')}
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
            {isValidName && (
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
            {errors.name && (
              <p className='text-error mt-0.5 text-[10px] ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                {errors.name.message}
              </p>
            )}
          </label>
        </li>
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
              <p className='text-error mt-[2px]  text-[10px] ml-3 font-medium leading-[12px] -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                {errors.password.message}
              </p>
            )}
            {isValidPassword && (
              <p className='text-success mt-[2px]  text-[10px] ml-3 font-medium leading-[12px] -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                Password is secure
              </p>
            )}
          </label>
        </li>
        <li>
          <label className='relative block'>
            <input
              className={`!text-sm font-medium leading-4.5 -tracking-[0.42px] md:!text-base md:leading-5 md:-tracking-[0.48px] border outline-none transition-all duration-200 rounded-[30px] w-full p-3 md:p-4 ${
                errors.confirmPassword
                  ? 'border-error'
                  : isValidconfirmPassword
                  ? 'border-success'
                  : 'border-inputs'
              } hover:border-brand`}
              type={repeatPasswordVisible ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Confirm password'
              {...register('confirmPassword')}
            />
            {isValidconfirmPassword && (
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
              className='group absolute top-3 transition-all duration-200 right-3 md:top-4 md:right-4 cursor-pointer'
              onClick={toggleRepeatPasswordVisibility}
            >
              {repeatPasswordVisible ? (
                <svg
                  width='18'
                  height='18'
                  className={`fill-transparent md:w-5.5 md:h-5.5  ${
                    errors.confirmPassword ? 'stroke-error' : 'stroke-brand'
                  } group-hover:stroke-hover`}
                >
                  <use href={`${sprite}#icon-eye-on`}></use>
                </svg>
              ) : (
                <svg
                  width='18'
                  height='18'
                  className={`fill-transparent md:w-5.5 md:h-5.5  ${
                    errors.confirmPassword ? 'stroke-error' : 'stroke-brand'
                  } group-hover:stroke-hover`}
                >
                  <use href={`${sprite}#icon-eye-off`}></use>
                </svg>
              )}
            </button>

            {errors.confirmPassword && (
              <p className='text-error mt-0.5  text-[10px] ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                {errors.confirmPassword.message}
              </p>
            )}
            {isValidconfirmPassword && (
              <p className='text-success mt-0.5  text-[10px] ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                Passwords match
              </p>
            )}
          </label>
        </li>
      </ul>
      <div className='flex flex-col  w-full gap-3'>
        <button
          type='submit'
          disabled={isLoading}
          className='flex justify-center p-3 w-ful bg-brand rounded-[30px] text-text-white transition-all font-bold duration-300 hover:bg-hover cursor-pointer md:p-4.5 '
        >
          {isLoading ? (
            <Loader
              height={'18'}
              width={'18'}
              color={'var(--color-text-white)'}
            />
          ) : (
            'REGISTRATION'
          )}
        </button>
        <p className='text-center text-xs text-text-gray font-medium md:text-sm'>
          Already have an account?{' '}
          <NavLink
            className='text-brand transition-all duration-300 hover:text-hover cursor-pointer hover:underline'
            to='/login'
          >
            Login
          </NavLink>
        </p>
      </div>
    </form>
  );
};
export default RegistrationForm;
