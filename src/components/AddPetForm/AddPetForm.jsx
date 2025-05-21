import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import sprite from '../../assets/sprite.svg';
import UniversalSelect from '../UniversalSelect/UniversalSelect.jsx';
import { selectSpecies } from '../../redux/filters/selectors.js';
import { getNoticesSearchSpecies } from '../../redux/filters/operations.js';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';
import DatePicker from 'react-datepicker';
import { NavLink, useNavigate } from 'react-router-dom';
import { orderAddPetSchema } from '../../utils/formValidation.js';
import { addPets } from '../../redux/user/operations.js';
import { errToast, successfullyToast } from '../../utils/toast.js';
import { selectIsLoading } from '../../redux/user/selectors.js';
import Loader from '../Loader/Loader.jsx';

const AddPetForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const speciesOption = useSelector(selectSpecies);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(getNoticesSearchSpecies());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(orderAddPetSchema),
    defaultValues: {
      name: '',
      title: '',
      imgURL: '',
      species: '',
      birthday: '',
      sex: '',
    },
  });

  const onSubmit = async data => {
    try {
      await dispatch(addPets(data)).unwrap();

      navigate('/profile');
      successfullyToast('Add pet is successfully');
    } catch (error) {
      errToast(error);
    }
  };

  const handlePreviewAvatar = () => {
    const avatarUrl = watch('imgURL');

    const urlPattern = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/;
    if (urlPattern.test(avatarUrl)) {
      setPreview(avatarUrl);
    } else {
      setPreview(null);
      errToast('Avatar format png|jpg|jpeg|gif|bmp|webp');
    }
  };

  return (
    <div className='w-full max-w-[335px] py-10 px-5 rounded-[30px] bg-text-white  md:max-w-[704px] md:px-34 md:py-10 xl:max-w-[592px] xl:px-20 xl:py-15'>
      <h2 className='text-[28px] font-bold mb-6 leading-7 -tracking-[0.84px] md:text-[32px] md:leading-8 md:-tracking-[0.96px] md:mb-10'>
        Add my pet /{' '}
        <span className='text-sm leading-4.5 text-text-gray-light tracking-normal md:text-base md:leading-5'>
          Personal details
        </span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex items-center m-0 md:items-start'>
          <ul className='flex gap-2 mb-2 md:mb-0'>
            <li>
              <label className='relative cursor-pointer group block'>
                <input
                  type='radio'
                  value='male'
                  {...register('sex')}
                  className='sr-only peer'
                />
                <div className='relative w-8 h-8 rounded-full bg-[#F43F5E1A] group-hover:bg-[#F43F5E] peer-checked:bg-[#F43F5E] transition-all duration-200 md:h-10 md:w-10'></div>
                <svg className='absolute block leading-none pointer-events-none top-1.5 left-1.5 w-5 h-5 fill-transparent stroke-[#F43F5E] transition-all duration-200 group-hover:stroke-text-white peer-checked:stroke-white md:top-2 md:left-2 md:w-6 md:h-6'>
                  <use href={`${sprite}#icon-female`} />
                </svg>
              </label>
            </li>
            <li>
              <label className='relative cursor-pointer group block'>
                <input
                  type='radio'
                  value='female'
                  {...register('sex')}
                  className='sr-only peer'
                />
                <div className='relative w-8 h-8 rounded-full  bg-[#54ADFF1A] group-hover:bg-[#54ADFF] peer-checked:bg-[#54ADFF] transition-all duration-200 md:h-10 md:w-10'></div>
                <svg className='absolute block leading-none pointer-events-none top-1.5 left-1.5 w-5 h-5 fill-transparent stroke-[#54ADFF] transition-all duration-200  group-hover:stroke-text-white peer-checked:stroke-text-white md:top-2 md:left-2 md:w-6 md:h-6'>
                  <use href={`${sprite}#icon-male`} />
                </svg>
              </label>
            </li>
            <li>
              <label className='relative cursor-pointer group block'>
                <input
                  type='radio'
                  value='unknown'
                  {...register('sex')}
                  className='sr-only peer'
                />
                <div className='relative w-8 h-8 rounded-full  bg-brand-light group-hover:bg-brand transition-all duration-200 peer-checked:bg-brand md:h-10 md:w-10'></div>
                <svg className='absolute block leading-none pointer-events-none w-5 h-5 fill-brand top-1.5 left-1.5 stroke-transparent group-hover:fill-text-white transition-all duration-200 peer-checked:fill-text-white md:top-2 md:left-2 md:w-6 md:h-6'>
                  <use href={`${sprite}#icon-unknown`} />
                </svg>
              </label>
            </li>
          </ul>
          {errors.sex && (
            <p className='text-error text-[10px] ml-5 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
              {errors.sex.message}
            </p>
          )}
        </div>
        <div className='p-[17px] flex items-center justify-center mx-auto rounded-full bg-brand-light h-[68px] w-[68px] mb-3 md:-mt-5.5 md:h-[86px] md:w-[86px] md:p-[21px]'>
          {preview ? (
            <img
              src={preview}
              alt='Avatar'
              className='mx-auto rounded-full max-w-17 md:max-w-21.5'
            />
          ) : (
            <svg
              className='fill-brand stroke-transparent md:w-11 md:h-11'
              width='40'
              height='40'
            >
              <use href={`${sprite}#icon-paw`}></use>
            </svg>
          )}
        </div>

        <div
          className={`flex justify-between gap-2  ${
            errors.imgURL ? 'mb-0' : 'mb-2.5 md:mb-4.5'
          }`}
        >
          <label className='block max-w-[170px] text-xs font-medium leading-4 -tracking-[0.24px] md:w-[278px] md:max-w-[278px] md:text-sm md:leading-4.5 md:-tracking-[0.28px]'>
            <input
              type='text'
              placeholder='Enter URL'
              {...register('imgURL')}
              className={`w-full truncate block p-2.5 pr-5 border rounded-[30px] outline-none hover:border-brand focus:border-brand  ${
                errors.imgURL ? 'border-error' : 'border-inputs'
              }`}
            />
          </label>

          <button
            type='button'
            className='flex items-center gap-2 cursor-pointer p-2.5 rounded-[30px] bg-brand-light !text-xs leading-4 -tracking-[0.24px] font-medium transition-all duration-200 hover:bg-hover-light md:!text-sm md:leading-4.5 md:-tracking-[0.28px] md:px-4'
            onClick={handlePreviewAvatar}
          >
            Upload photo
            <svg
              className='fill-transparent stroke-brand'
              width='16'
              height='16'
            >
              <use href={`${sprite}#icon-upload`}></use>
            </svg>
          </button>
        </div>
        {errors.imgURL && (
          <p className='text-error text-[10px] mb-1.5 ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
            {errors.imgURL.message}
          </p>
        )}

        <ul className='flex flex-col gap-2.5 mb-5 md:gap-4.5 md:mb-10'>
          <li>
            <label className='block text-sm font-medium leading-4.5 -tracking-[0.42] md:text-base md:leading-5 md:-tracking-[0.48px]'>
              <input
                type='text'
                placeholder='Title'
                {...register('title')}
                className={`w-full p-3 border rounded-[30px] outline-none md:p-4 hover:border-brand focus:border-brand  ${
                  errors.title ? 'border-error' : 'border-inputs'
                }`}
              />
              {errors.title && (
                <p className='text-error text-[10px]  ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                  {errors.title.message}
                </p>
              )}
            </label>
          </li>

          <li>
            <label className='block text-sm font-medium leading-4.5 -tracking-[0.42] md:text-base md:leading-5 md:-tracking-[0.48px] '>
              <input
                type='text'
                placeholder="Pet's Name"
                {...register('name')}
                className={`w-full p-3 border rounded-[30px] outline-none md:p-4 hover:border-brand focus:border-brand  ${
                  errors.name ? 'border-error' : 'border-inputs'
                }`}
              />
              {errors.name && (
                <p className='text-error text-[10px]  ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                  {errors.name.message}
                </p>
              )}
            </label>
          </li>

          <div className='flex justify-between'>
            <li className='w-full max-w-[144px] md:max-w-[210px]'>
              <label className='relative block w-full !text-sm font-medium leading-4.5 -tracking-[0.42]'>
                <Controller
                  control={control}
                  name='birthday'
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value ? new Date(field.value) : null}
                      onChange={date => {
                        const formatted =
                          date?.toISOString().split('T')[0] ?? '';
                        field.onChange(formatted);
                      }}
                      placeholderText='0000-00-00'
                      className={`w-full h-10.5 p-3 !text-sm border rounded-[30px] outline-none md:p-4 leading-5 -tracking-[0.48px] md:w-[210px] md:!text-base hover:border-brand focus:border-brand md:h-13  ${
                        errors.birthday ? 'border-error' : 'border-inputs'
                      }`}
                      dateFormat='dd.MM.yyyy'
                      showPopperArrow={false}
                      shouldCloseOnSelect={true}
                      calendarStartDay={1}
                      maxDate={new Date()}
                    />
                  )}
                />
                <svg
                  className='absolute top-3 right-3 fill-transparent stroke-text-gray-dark transition-all duration-200 hover:stroke-hover md:w-5 md:h-5 md:top-4 md:right-4 cursor-pointer'
                  width='18'
                  height='18'
                >
                  <use href={`${sprite}#icon-calendar`}></use>
                </svg>
                {errors.birthday && (
                  <p className='text-error text-[10px]  ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                    {errors.birthday.message}
                  </p>
                )}
              </label>
            </li>
            <li className='w-full max-w-[143px] md:max-w-[210px]'>
              <UniversalSelect
                name={'species'}
                control={control}
                baseSelect={speciesOption}
                iconName={'icon-arrow-small'}
                placeholder={'Type of pet'}
                addPetForm={true}
                errors={errors.species}
                wrapperClassName={
                  'w-full max-w-[143px] md:max-w-[210px] xl:max-w-[210px]'
                }
              />
              {errors.species && (
                <p className='text-error text-[10px]  ml-3 font-medium leading-3 -tracking-[0.3px] md:text-sm md:leading-3.5 md:-tracking-[0.36px]'>
                  {errors.species.message}
                </p>
              )}
            </li>
          </div>
        </ul>

        <div className='w-full flex justify-end gap-2'>
          <NavLink
            to='/profile'
            className='py-3 px-8.5 bg-disabled hover:bg-inputs rounded-[30px] !text-sm font-bold  transition-all duration-200 leading-4.5 -tracking-[0.42px] cursor-pointer md:py-3.5 md:px-[67px] md:!text-base md:leading-5 md:-tracking-[0.48px]'
          >
            Back
          </NavLink>
          <button
            type='submit'
            disabled={isLoading}
            className='flex justify-center py-3 px-6.5 w-[100px] bg-brand hover:bg-hover rounded-[30px] !text-sm font-bold text-text-white transition-all duration-200 leading-4.5 -tracking-[0.42px] cursor-pointer md:py-3.5 md:px-14.5 md:!text-base md:leading-5 md:-tracking-[0.48px] md:w-[170px]'
          >
            {isLoading ? (
              <Loader
                height={'18'}
                width={'18'}
                color={'var(--color-text-white)'}
              />
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddPetForm;
