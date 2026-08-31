import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  onDismiss: () => void;
}

function Notification({ message, onDismiss }: NotificationProps) {
  useEffect(() => {
    const timerId = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timerId);
  }, [message, onDismiss]);

  return (
    <div className="notification" role="status">
      <span>✓</span>
      <span>{message}</span>
    </div>
  );
}

export default Notification;