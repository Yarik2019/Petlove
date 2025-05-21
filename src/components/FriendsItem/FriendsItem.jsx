const FriendsItem = ({ dataItem }) => {
  const { title, phone, addressUrl, address, email, imageUrl, workDays, url } =
    dataItem;

  const workingDay = workDays?.find(day => day.isOpen);

  const from = workingDay?.from || '-';
  const to = workingDay?.to || '-';

  return (
    <li className='flex gap-3.5  py-10 pr-[25px] pl-5 bg-text-white rounded-[15px] relative md:gap-4 md:max-w-[342px] md:w-full xl:max-w-[370px] xl:gap-5'>
      <div className='absolute top-3 right-3 p-2 bg-brand-light rounded-[30px] text-xs text-brand leading-[16px] -tracking-[0.24px] md:text-sm md:leading-[18px] md:-tracking-[0.24px]'>
        <p>
          {Array.isArray(workDays) && workDays.length > 0
            ? `${from} - ${to}`
            : 'Day and night'}
        </p>
      </div>
      <a
        href={url}
        title={url}
        target='_blank'
        rel='noopener noreferrer'
        className='transition-all duration-200 hover:opacity-60'
      >
        <img
          className='rounded-full md:w-22.5 md:h-22.5'
          src={imageUrl}
          width={80}
          height={80}
          alt={`${title} img`}
        />
      </a>
      <div className='max-w-[196px] xl:max-w-[212px]'>
        <h3 className='font-bold leading-[20px] -tracking-[0.64px] mb-3.5 md:text-xl md:leading-[26x] md:-tracking-[0.8px] md:mb-5'>
          {title}
        </h3>
        <ul className='flex flex-col gap-2'>
          <li>
            <p className='flex gap-0.5 text-sm text-text-gray leading-[18px] font-medium -tracking-[0.28px]'>
              Email:
              {email ? (
                <a
                  className='block truncate text-text-dark cursor-pointer ml-0.5 transition-all duration-200 hover:text-hover'
                  href={`mailto:${email}`}
                  title={email}
                >
                  {email}
                </a>
              ) : (
                <span className='text-text-dark cursor-pointer ml-0.5'>
                  website only
                </span>
              )}
            </p>
          </li>
          <li>
            <p className='flex gap-0.5 text-sm text-text-gray leading-[18px] font-medium -tracking-[0.28px]'>
              Address:
              {address ? (
                <a
                  className='block truncate max-w-[137px] ml-0.5  text-text-dark cursor-pointer xl:max-w-[153px] transition-all duration-200 hover:text-hover'
                  href={addressUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  title={address}
                >
                  {address}
                </a>
              ) : (
                <span className='text-text-dark cursor-pointer'>
                  website only
                </span>
              )}
            </p>
          </li>
          <li>
            <p className='flex gap-0.5 text-sm text-text-gray leading-[18px] font-medium -tracking-[0.28px]'>
              Phone:
              {phone ? (
                <a
                  className='text-text-dark cursor-pointer ml-0.5 transition-all duration-200 hover:text-hover'
                  href={`tel:${phone}`}
                >
                  {phone}
                </a>
              ) : (
                <span className='text-text-dark cursor-pointer ml-0.5'>
                  email only
                </span>
              )}
            </p>
          </li>
        </ul>
      </div>
    </li>
  );
};
export default FriendsItem;
