import AddPet from '../AddPet/AddPet.jsx';
import PetsList from '../PetsList/PetsList.jsx';

const PetsBlock = ({ userCurrentFull }) => {
  const { pets } = userCurrentFull || {};
  return (
    <div className='mb-5'>
      <div className='flex justify-between items-center mb-5'>
        <h2 className='font-bold leading-5 md:text-lg md:leading-6'>My Pets</h2>
        <AddPet />
      </div>
      <PetsList pets={pets || []} />
    </div>
  );
};
export default PetsBlock;
