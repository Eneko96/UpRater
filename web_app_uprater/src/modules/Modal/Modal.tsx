import { useEffect, useRef } from 'react';

interface ITabComposition {
  Title: React.FC<any>;
  Body: React.FC<any>;
  Footer: React.FC<any>;
}

export const Modal: React.FC<{
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}> &
  ITabComposition = ({ open, onClose, children }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.();
    }
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (e.target === ref.current?.parentElement) onClose?.();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return open ? (
    <div className="fixed inset-0 backdrop-blur-sm">
      <dialog
        ref={ref}
        open={open}
        className="inset-0 backdrop-blur-md rounded-md p-6 bg-zinc-900 shadow-sm shadow-zinc-700"
      >
        {children}
      </dialog>
    </div>
  ) : null;
};

const Title: React.FC<any> = ({ children }) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

const Body: React.FC<any> = ({ children, className }) => {
  return <div className={`text-sm ${className}`}>{children}</div>;
};

const Footer: React.FC<any> = ({ children }) => {
  return <div className="flex justify-end">{children}</div>;
};

Modal.Footer = Footer;
Modal.Body = Body;
Modal.Title = Title;
