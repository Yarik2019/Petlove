import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { orderEditUserSchema } from '../../../utils/formValidation.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCurrentFull } from '../../../redux/user/selectors.js';
import sprite from '../../../assets/sprite.svg';
import { editUserCurrent } from '../../../redux/user/operations.js';
import { errToast, successfullyToast } from '../../../utils/toast.js';

const ModalEditUser = ({ onClose }) => {
  const dispatch = useDispatch();
  const userCurrentFull = useSelector(selectUserCurrentFull);

  const { name, avatar, email, phone } = userCurrentFull || {};
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(orderEditUserSchema),
    defaultValues: {
      name: name || '',
      email: email || '',
      phone: phone || '+380',
      avatar: avatar || '',
    },
  });

  const onSubmit = async data => {
    try {
      await dispatch(editUserCurrent(data)).unwrap();
      successfullyToast('Edit User is successfully');
      onClose();
    } catch (error) {
      errToast(error);
    }
  };

  const handlePreviewAvatar = () => {
    const avatarUrl = watch('avatar');

    const urlPattern = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/;
    if (urlPattern.test(avatarUrl)) {
      setPreview(avatarUrl);
    } else {
      setPreview(null);
      errToast('Avatar format png|jpg|jpeg|gif|bmp|webp');
    }
  };

  return (
    <div className='w-full max-w-[335px] py-10 px-5 rounded-[30px] bg-text-white md:w-[480px] md:max-w-[480px] md:p-12.5'>
      <h2 className='text-xl font-bold mb-5 leading-5'>Edit information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {preview || avatar ? (
          <img
            src={preview || avatar}
            alt='Avatar'
            className='mx-auto rounded-full max-w-20 mb-3 md:max-w-21.5'
          />
        ) : (
          <div className='p-[27px] mx-auto rounded-full bg-brand-light max-w-[94px] mb-3'>
            <svg className='fill-brand stroke-brand' width='40' height='40'>
              <use href={`${sprite}#icon-user`}></use>
            </svg>
          </div>
        )}

        <div className='flex justify-between gap-2 mb-2.5 md:mb-5'>
          <label className='block max-w-[161px] text-xs font-medium leading-4 -tracking-[0.24px] md:w-[226px] md:max-w-[226px] md:text-sm md:leading-4.5 md:-tracking-[0.28px]'>
            <input
              type='text'
              placeholder='Avatar URL'
              {...register('avatar')}
              className='w-full truncate block p-3 pr-9 border border-brand rounded-[30px] outline-none md:pr-5'
            />
            {errors.avatar && (
              <p className='text-red-500 text-sm'>{errors.avatar.message}</p>
            )}
          </label>

          <button
            type='button'
            className='flex items-center gap-2 cursor-pointer p-3 rounded-[30px] bg-brand-light !text-xs leading-4 -tracking-[0.24px] font-medium transition-all duration-200 hover:bg-hover-light md:!text-sm md:leading-4.5 md:-tracking-[0.28px] md:px-4 '
            onClick={handlePreviewAvatar}
          >
            Upload photo
            <svg
              className='fill-transparent stroke-brand'
              width='18'
              height='18'
            >
              <use href={`${sprite}#icon-upload`}></use>
            </svg>
          </button>
        </div>

        <ul className='flex flex-col gap-2.5 mb-5 md:gap-3.5 md:mb-10'>
          <li>
            <label className='block text-sm font-medium leading-4.5 -tracking-[0.42]'>
              <input
                type='text'
                {...register('name')}
                className='w-full p-3 border border-brand rounded-[30px] outline-none'
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </label>
          </li>

          <li>
            <label className='block text-sm font-medium leading-4.5 -tracking-[0.42]'>
              <input
                type='email'
                {...register('email')}
                className='w-full p-3 border border-brand rounded-[30px] outline-none'
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </label>
          </li>

          <li>
            <label className='block text-sm font-medium leading-4.5 -tracking-[0.42]'>
              <input
                type='tel'
                {...register('phone')}
                className='w-full p-3 border border-brand rounded-[30px] outline-none'
              />
              {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone.message}</p>
              )}
            </label>
          </li>
        </ul>

        <button
          type='submit'
          className='w-full p-3 bg-brand hover:bg-hover rounded-[30px] !text-sm font-bold text-text-white transition-all duration-200 leading-4.5 -tracking-[0.42px] cursor-pointer md:p-4 md:!text-base md:leading-5 md:-tracking-[0.48px]'
        >
          Save
        </button>
      </form>
    </div>
  );
};
export default ModalEditUser;
