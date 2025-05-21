import toast from 'react-hot-toast';

export const errToast = message => {
  toast.error(`${message}`, {
    duration: 4000,
    position: 'bottom-right',
    style: {
      borderRadius: '30px',
      background: 'var(--color-text-white)',
      color: 'var(--error-color)',
      border: '1px solid var(--error-color)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      padding: '12px 16px',
    },
    icon: '🚩',
  });
};

export const successfullyToast = message => {
  toast.success(`${message}`, {
    duration: 4000,
    position: 'bottom-right',
    style: {
      borderRadius: '30px',
      background: 'var(--color-text-white)',
      color: 'var(--color-brand)',
      border: '1px solid var(--success-color)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      padding: '12px 16px',
    },
    icon: '✅',
  });
};
