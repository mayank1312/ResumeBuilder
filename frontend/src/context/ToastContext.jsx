import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    setToasts(prev => [...prev, newToast]);
    return id; // Return the ID for loading toasts
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const updateToast = (id, message, type = 'success', duration = 3000) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, message, type, duration } : toast
    ));
  };

  const toast = {
    success: (message, options = {}) => {
      if (options.id) {
        updateToast(options.id, message, 'success', options.duration);
      } else {
        return addToast(message, 'success', options.duration);
      }
    },
    error: (message, options = {}) => {
      if (options.id) {
        updateToast(options.id, message, 'error', options.duration);
      } else {
        return addToast(message, 'error', options.duration);
      }
    },
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
    loading: (message) => addToast(message, 'loading', 0), // Loading toasts don't auto-dismiss
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toastItem => (
          <Toast
            key={toastItem.id}
            message={toastItem.message}
            type={toastItem.type}
            duration={toastItem.duration}
            onClose={() => removeToast(toastItem.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
