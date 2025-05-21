import PetBlock from '../../components/PetBlock/PetBlock.jsx';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.jsx';

const RegistrationPage = () => {
  return (
    <section className='max-w-[375px] px-5 mx-auto md:max-w-[768px] md:px-8 xl:max-w-[1280px]'>
      <div className='flex flex-col py-5 gap-2.5 md:py-8 md:gap-4 xl:flex-row xl:gap-8 xl:items-stretch '>
        <PetBlock isPet={'cat'} />
        <RegistrationForm />
      </div>
    </section>
  );
};
export default RegistrationPage;
