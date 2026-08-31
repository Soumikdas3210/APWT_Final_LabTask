interface LoadingSpinnerProps {
  message?: string;
}

function LoadingSpinner({ message = 'Loading student records...' }: LoadingSpinnerProps) {
  return (
    <div className="loading-state" role="status">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;