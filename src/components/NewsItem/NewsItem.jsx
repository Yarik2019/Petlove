import { formatDate } from '../../utils/formatDate.js';

const NewsItem = ({ item }) => {
  return (
    <li
      className='max-w-[335px] md:max-w-[340px] md:pb-7 xl:max-w-[361px]'
      key={item._id}
    >
      <img
        className='w-full  h-[190px] object-cover rounded-[15px] mb-5 md:h-[226px]'
        src={item.imgUrl}
        alt={item.title}
      />
      <h3 className='font-bold leading-[20px] -tracking-[0.48px] mb-3 h-10 line-clamp-2 md:text-xl md:leading-[26px] md:-tracking-[0.6px] md:h-13 md-mb-3.5'>
        {item.title}
      </h3>
      <p className='text-sm font-medium leading-[18px] -tracking-[0.26px] mb-4 line-clamp-4 h-20 md:text-base md:leading-[20px] md:-tracking-[0.32px] md:mb-7'>
        {item.text}
      </p>
      <div className='flex justify-between'>
        <p className='text-sm text-text-gray font-medium leading-[18px] -tracking-[0.28px] '>
          {formatDate(item.date)}
        </p>
        <a
          className='text-brand underline font-medium text-sm leading-[18px] -tracking-[0.28px] transition-all duration-200 hover:text-hover hover:underline-offset-2'
          href={item.url}
        >
          Read more
        </a>
      </div>
    </li>
  );
};
export default NewsItem;
