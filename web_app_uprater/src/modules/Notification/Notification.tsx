import { useEffect } from 'react';
import { useRootContext } from '../../contexts/RootContext';

const colorType = {
  info: 'text-blue-800',
  danger: 'text-red-800',
  success: 'text-green-800',
  warning: 'text-yellow-800',
  dark: 'text-gray-800',
};

export const Notification: React.FC = () => {
  const { notification, setNotification } = useRootContext();

  useEffect(() => {
    if (!notification.show) return;
    const timer = setTimeout(() => {
      setNotification({
        ...notification,
        show: false,
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification.show]);

  return (
    <div
      className={`top-2 min-w-full p-4 mb-4 text-sm ${
        colorType[notification.type]
      } ${
        notification.show ? 'absolute' : 'hidden'
      } rounded-lg bg-blue-50 dark:bg-gray-800`}
      role="alert"
    >
      <span className="font-medium"></span>
      {notification.message || 'Default message'}
    </div>
  );
};
