// src/components/common/Input.jsx
const Input = ({
    label,
    error,
    className = '',
    ...props
  }) => {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          className={`
            appearance-none block w-full px-3 py-2 border rounded-md shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
            ${error ? 'border-red-300' : 'border-gray-300'}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  };
  
  export default Input;