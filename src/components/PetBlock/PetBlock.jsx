import cat from '../../assets/img/cat.png';
import dog from '../../assets/img/corgi.png';
import dogDesk from '../../assets/img/corgi-desk.png';
import catDesk from '../../assets/img/cat-desk.png';
import dogIcon from '../../assets/img/dog-icon.png';
import catIcon from '../../assets/img/cat-icon.png';
import rectangle from '../../assets/img/rectangle.png';
import rectangleDesk from '../../assets/img/rectangle-desk.png';
import addDog from '../../assets/img/add-dog-img.png';
import addDogTab from '../../assets/img/add-dog-img-tab.png';
import addDogDesk from '../../assets/img/add-dog-img-desk.png';
import useMediaQuery from '../../hooks/useMediaQuery.js';

const PetBlock = ({ isPet }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDesk = useMediaQuery('(min-width: 1280px)');

  const cats = isPet === 'cat';
  const dogs = isPet === 'dog';
  const addDogs = isPet === 'addDog';

  return (
    <div
      className={
        addDogs
          ? 'rounded-[30px] bg-brand max-w-[335px] h-[213px] relative md:max-w-[704px] md:h-[248px] xl:w-1/2 xl:min-h-[654px]'
          : 'rounded-[30px] bg-brand max-w-[335px] h-[280px] relative md:max-w-[704px] md:h-[302px] xl:w-1/2 xl:min-h-[654px]'
      }
    >
      {isDesk ? (
        <img
          className='absolute bottom-0 left-8'
          src={rectangleDesk}
          alt='cat'
        />
      ) : (
        <img
          className={
            addDogs
              ? 'absolute top-8 right-0 md:w-[562px] md:top-11 md:right-12'
              : 'absolute bottom-0 right-0 md:w-[562px] md:top-11 md:right-12'
          }
          src={rectangle}
          alt='rectangle'
        />
      )}
      {cats &&
        (isDesk ? (
          <img className='absolute bottom-0 left-8' src={catDesk} alt='cat' />
        ) : (
          <img
            className='absolute bottom-0 md:right-22.5'
            src={cat}
            alt='cat'
          />
        ))}

      {dogs &&
        (isDesk ? (
          <img className='absolute bottom-0 left-8' src={dogDesk} alt='cat' />
        ) : (
          <img
            className='absolute bottom-0 md:right-22.5'
            src={dog}
            alt='cat'
          />
        ))}
      {addDogs &&
        (isDesk ? (
          <img
            className='absolute bottom-0 left-8'
            src={addDogDesk}
            alt='Add dog img'
          />
        ) : isMobile ? (
          <img
            className='absolute top-0 right-4.5 md:right-22.5'
            src={addDog}
            alt='Add dog img'
          />
        ) : (
          <img
            className='absolute bottom-0 right-4.5 md:right-50.5'
            src={addDogTab}
            alt='Add dog img'
          />
        ))}
      {!isMobile && !addDogs && (
        <div className='absolute bottom-8 left-8 max-w-[300px] p-4 bg-text-white rounded-[30px] flex gap-2 xl:left-15 xl:bottom-24.5'>
          <div className='w-15 h-15 bg-brand-light rounded-full flex justify-center items-center'>
            <img
              className='block'
              src={cats ? catIcon : dogIcon}
              width={32}
              height={32}
              alt='Animal img'
            />
          </div>
          <div className='max-w-[201px]'>
            <div className='flex justify-between items-center mb-2'>
              <p className='font-bold text-brand'>{cats ? 'Jack' : 'Rich'}</p>
              <p className='text-xs font-medium text-text-gray'>
                Birthday:{' '}
                <span className='text-text-dark'>
                  {cats ? '18.10.2021' : '21.09.2020'}
                </span>
              </p>
            </div>
            <p className='text-xs font-medium'>
              {cats
                ? 'Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys.'
                : 'Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default PetBlock;
