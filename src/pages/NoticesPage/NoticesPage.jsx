import { useDispatch, useSelector } from 'react-redux';
import NoticesFilters from '../../components/NoticesFilters/NoticesFilters.jsx';
import NoticesList from '../../components/NoticesList/NoticesList.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Title from '../../components/Title/Title.jsx';
import {
  selectIsLoadingNotices,
  selectTotalPages,
} from '../../redux/notices/selectors.js';
import { getAllNoticesData } from '../../redux/notices/operations.js';
import { useEffect } from 'react';
import { selectFilters } from '../../redux/filters/selectors.js';
import { setFiltersPage } from '../../redux/filters/slice.js';
import Loader from '../../components/Loader/Loader.jsx';

const NoticesPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingNotices);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(getAllNoticesData(filters));
  }, [dispatch, filters]);

  return (
    <section className='container'>
      <div className='pt-15 pb-20 md:pt-21.5 xl:pt-24'>
        <Title titleText={'Find your favorite pet'} />
        <NoticesFilters filters={filters} />
        {isLoading ? (
          <div className='flex justify-center h-[200px] items-center '>
            <Loader height={'80'} width={'80'} color={'var(--color-brand)'} />
          </div>
        ) : (
          <NoticesList />
        )}
        <Pagination
          page={filters.page}
          totalPages={totalPages}
          setPage={setFiltersPage}
        />
      </div>
    </section>
  );
};
export default NoticesPage;
