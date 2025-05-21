import Select, { components } from 'react-select';
import { Controller } from 'react-hook-form';
import sprite from '../../assets/sprite.svg';
import useMediaQuery from '../../hooks/useMediaQuery.js';

const DropdownIndicator = props => {
  const { selectProps } = props;
  const icon = selectProps.iconName;
  return (
    <components.DropdownIndicator {...props}>
      <svg
        className={
          icon === 'icon-search'
            ? 'fill-transparent stroke-text-dark'
            : 'fil-text-dark stroke-text-dark -rotate-90'
        }
        width={18}
        height={18}
      >
        <use href={`${sprite}#${icon}`} />
      </svg>
    </components.DropdownIndicator>
  );
};

const CustomOption = props => {
  const { data, selectProps } = props;
  const inputValue = selectProps.inputValue.toLowerCase();
  const label = data.label;
  const index = label.toLowerCase().indexOf(inputValue);

  let content;
  if (index !== -1 && inputValue.length > 0) {
    content = (
      <>
        {label.slice(0, index)}
        <span className={'text-text-dark font-bold'}>
          {label.slice(index, index + inputValue.length)}
        </span>
        {label.slice(index + inputValue.length)}
      </>
    );
  } else {
    content = label;
  }

  return <components.Option {...props}>{content}</components.Option>;
};

const UniversalSelect = ({
  name,
  control,
  cities,
  baseSelect,
  iconName,
  wrapperClassName,
  addPetForm,
  errors,
  placeholder = 'Location',
}) => {
  let options;

  if (cities) {
    options = cities.map(city => ({
      value: city._id,
      label: `${city.cityEn}, ${city.stateEn}`,
    }));
  } else {
    options = baseSelect.map(base => ({
      value: base,
      label: base.charAt(0).toUpperCase() + base.slice(1),
    }));
  }

  const isMobile = useMediaQuery('(max-width: 768px)');

  const customStyles = {
    control: (base, { isFocused }) => ({
      ...base,
      borderRadius: '30px',
      backgroundColor: 'var(--color-text-white)',
      border: isFocused
        ? '1px solid var(--color-brand)'
        : addPetForm
        ? errors
          ? '1px solid var(--error-color)'
          : '1px solid var(--inputs-color)'
        : '1px solid transparent',
      borderColor: isFocused
        ? 'var(--color-brand)'
        : addPetForm
        ? 'var(--color-brand)'
        : 'none',
      padding: isMobile ? '12px' : addPetForm ? '16px' : '14px',
      boxShadow: 'none',
      fontSize: isMobile ? '14px' : '16px',
      boxSizing: 'border-box',
      cursor: 'pointer',
      outline: 'none',
      height: addPetForm ? (isMobile ? '42px' : '52px') : '',
      width: '100%',
      ':hover': {
        border: '1px solid var(--color-brand)',
      },
    }),
    input: base => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    indicatorsContainer: base => ({
      ...base,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: 'none',
      padding: 0,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      padding: 0,
      transition: 'transform 0.2s ease-in-out',
      transform: state.selectProps.menuIsOpen
        ? 'rotate(180deg)'
        : 'rotate(0deg)',
      fill: addPetForm ? 'var(--color-text-gray)' : '',
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: 'var(--color-text-white)',
      color: isFocused ? 'var(--color-brand)' : 'var(--color-text-gray-dark)',
      fontSize: isMobile ? '14px' : '16px',
      borderRadius: '10px',
      padding: isMobile ? '12px' : '4px',
      cursor: 'pointer',
    }),
    menu: base => ({
      ...base,
      borderRadius: '10px',
      marginTop: 4,
      padding: isMobile ? '12px' : '14px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    }),
    valueContainer: base => ({
      ...base,
      paddingLeft: '0',
      padding: '1px',
    }),
    placeholder: base => ({
      ...base,
      color: addPetForm ? 'var(--color-text-gray)' : 'var(--color-text-dark)',
      padding: 0,
    }),
    menuList: base => ({
      ...base,
      scrollbarWidth: 'thin',
      '::-webkit-scrollbar': {
        background: 'var(--error-color)',
        width: '10px',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'var(--error-color)',
        borderRadius: '10px',
      },
    }),
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={wrapperClassName}>
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            isSearchable={cities ? true : false}
            components={{ DropdownIndicator, Option: CustomOption }}
            styles={customStyles}
            iconName={iconName}
            value={options.find(opt => opt.value === field.value)}
            onChange={selectedOption => field.onChange(selectedOption.value)}
          />
        </div>
      )}
    />
  );
};

export default UniversalSelect;
