import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import Notification from '../components/Notification';
import { Notification as NotificationType } from '../types';

interface NotificationContextType {
  addNotification: (notification: Omit<NotificationType, 'id'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationType, 'id'>) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, ...notification }]);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] space-y-2">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
