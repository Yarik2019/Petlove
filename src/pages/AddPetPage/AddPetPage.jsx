import AddPetForm from '../../components/AddPetForm/AddPetForm.jsx';
import PetBlock from '../../components/PetBlock/PetBlock.jsx';

const AddPetPage = () => {
  return (
    <section className='max-w-[375px] mx-auto px-5 md:max-w-[768px] md:px-8 xl:max-w-[1280px]'>
      <div className='flex flex-col gap-2.5 mt-3 mb-5 md:gap-4 md:mt-8 xl:flex-row xl:gap-8 xl:mb-0'>
        <PetBlock isPet={'addDog'} />
        <AddPetForm />
      </div>
    </section>
  );
};
export default AddPetPage;
