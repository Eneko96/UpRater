import { useEffect } from 'react';
import { useTriggers } from '../../store/triggers';

const colorType = {
  info: 'text-blue-800',
  danger: 'text-red-800',
  success: 'text-green-800',
  warning: 'text-yellow-800',
  dark: 'text-gray-800',
};
type Type = keyof typeof colorType;

export const Notification: React.FC<{ type: Type; msg: string }> = ({
  type,
  msg,
}) => {
  const triggers = useTriggers((session) => session.triggers);
  const setNotification = useTriggers((session) => session.setTriggers);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ ...triggers, notification: false });
    }, 5000);
    return () => clearTimeout(timer);
  }, [triggers.notification]);

  return (
    <div
      className={`top-2 min-w-full p-4 mb-4 text-sm ${colorType[type]} ${
        triggers.notification ? 'absolute' : 'hidden'
      } rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400`}
      role="alert"
    >
      <span className="font-medium">
        {type.slice(0, 1).toUpperCase() + type.slice(1)} alert!
      </span>
      {msg}
    </div>
  );
};
