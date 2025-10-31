import React, { useEffect, useState } from 'react';
import { Notification as NotificationType } from '../types';

interface NotificationProps {
  notification: NotificationType;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 300); // Allow time for exit animation
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(onClose, 300);
  };

  const baseClasses = "max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden";
  const animationClasses = exiting ? "animate-fadeOut" : "animate-fadeIn";

  const typeStyles = {
    success: { icon: '✅', bar: 'bg-green-500' },
    error: { icon: '❌', bar: 'bg-red-500' },
    info: { icon: 'ℹ️', bar: 'bg-blue-500' },
  };

  return (
    <div className={`${baseClasses} ${animationClasses}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 text-xl">
            {typeStyles[notification.type].icon}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button onClick={handleClose} className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`h-1 ${typeStyles[notification.type].bar} animate-life`}></div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeOut { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(100%); } }
        @keyframes life { from { width: 100%; } to { width: 0%; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-fadeOut { animation: fadeOut 0.3s ease-in forwards; }
        .animate-life { animation: life 5s linear forwards; }
      `}</style>
    </div>
  );
};

export default Notification;
