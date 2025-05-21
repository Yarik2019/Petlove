import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsData } from '../../redux/friends/operations.js';
import {
  selectFriendsData,
  selectIsFriendsLoading,
} from '../../redux/friends/selectors.js';
import FriendsItem from '../FriendsItem/FriendsItem.jsx';
import Loader from '../Loader/Loader.jsx';

const FriendsList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsFriendsLoading);

  const friendsData = useSelector(selectFriendsData);

  useEffect(() => {
    dispatch(getFriendsData());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center h-[400px] items-center '>
          <Loader height={'80'} width={'80'} color={'var(--color-brand)'} />
        </div>
      ) : (
        <ul className='flex flex-col gap-5 mt-10 md:flex-row md:flex-wrap xl:gap-y-7'>
          {friendsData.map(item => (
            <FriendsItem key={item._id} dataItem={item} />
          ))}
        </ul>
      )}
    </>
  );
};
export default FriendsList;
