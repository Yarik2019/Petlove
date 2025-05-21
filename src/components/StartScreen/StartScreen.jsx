import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import s from './StartScreen.module.css';

const StartScreen = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLoader(true);
    }, 500);
    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (!showLoader) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        return prev < 100 ? prev + 1 : 100;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [showLoader]);

  useEffect(() => {
    if (progress === 100) {
      const redirectTimer = setTimeout(() => {
        navigate('/home');
      }, 300);
      return () => clearTimeout(redirectTimer);
    }
  }, [progress, navigate]);

  return (
    <div className={s.wrapper}>
      {showLoader ? (
        <>
          <div className={s.ring}></div>
          <p className={s.loaderText}>{`${progress}%`}</p>
        </>
      ) : (
        <Logo />
      )}
    </div>
  );
};

export default StartScreen;
