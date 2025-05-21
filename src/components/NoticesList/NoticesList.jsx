import { useSelector } from 'react-redux';
import { selectNotices } from '../../redux/notices/selectors.js';
import NoticesItem from '../NoticesItem/NoticesItem.jsx';

const NoticesList = () => {
  const dataNotices = useSelector(selectNotices);

  return (
    <>
      {!dataNotices?.length > 0 ? (
        <div className='px-8 py-5 md:py-15'>
          <p className='text-center font-bold text-brand md:text-2xl xl:text-3xl'>
            Sorry, nothing was found for this query.
          </p>
        </div>
      ) : (
        <ul className='flex flex-col gap-5 mb-11 md:flex-row md:flex-wrap md:mb-15 xl:gap-x-8 xl:gap-y-10'>
          {dataNotices?.map(item => (
            <NoticesItem key={item._id} dataItem={item} />
          ))}
        </ul>
      )}
    </>
  );
};
export default NoticesList;
