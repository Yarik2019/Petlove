import { Circles } from 'react-loader-spinner';

const Loader = ({ height, width, color }) => {
  return (
    <Circles
      height={height}
      width={width}
      color={color}
      // ariaLabel='circles-loading'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
    />
  );
};

export default Loader;
