import { useDispatch, useSelector } from 'react-redux';
import MyNotices from '../../components/MyNotices/MyNotices.jsx';
import UserCard from '../../components/UserCard/UserCard.jsx';
import { useEffect } from 'react';
import { getUserFullCurrentData } from '../../redux/user/operations.js';
import { selectIsLoggedIn } from '../../redux/user/selectors.js';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const isLogedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLogedIn) dispatch(getUserFullCurrentData());
  }, [dispatch, isLogedIn]);

  return (
    <section className='max-w-[375px] mx-auto px-5 md:max-w-[768px] md:px-8 xl:max-w-[1280px]'>
      <div className='flex flex-col gap-10 pt-4.5 pb-14 md:pt-8 md:pb-15 xl:pb-8 xl:flex-row xl:gap-8'>
        <UserCard />
        <MyNotices />
      </div>
    </section>
  );
};
export default ProfilePage;
