import FriendsList from '../../components/FriendsList/FriendsList.jsx';
import Title from '../../components/Title/Title.jsx';

const OurFriendsPage = () => {
  return (
    <section className='container'>
      <div className='pt-13.5 pb-20'>
        <Title titleText={'Our friends'} />
        <FriendsList />
      </div>
    </section>
  );
};
export default OurFriendsPage;
