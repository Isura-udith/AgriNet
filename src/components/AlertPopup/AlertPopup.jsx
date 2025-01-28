import { X } from 'lucide-react';
import PropTypes from 'prop-types';

const AlertPopup = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-100 text-green-800 border-green-500',
    error: 'bg-red-100 text-red-800 border-red-500',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    info: 'bg-blue-100 text-blue-800 border-blue-500',
  };

  return (
    <div className={`fixed top-16 z-50 flex items-center p-4 border rounded-lg shadow-lg w-[350px] ${typeStyles[type]}`}>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
AlertPopup.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertPopup;