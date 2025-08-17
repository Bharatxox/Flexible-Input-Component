import React, { useEffect } from "react";
import type { InputFieldProps } from "../interface/InputFieldProp";

const InputField: React.FC<InputFieldProps> = ({
  value: controlledValue,
  onChange: controlledOnChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
  type = "text",
  showClearButton = false,
  showPasswordToggle = false,
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState(
    controlledValue || ""
  );
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const displayValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (controlledOnChange) {
      controlledOnChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const handleClear = () => {
    if (controlledOnChange) {
      controlledOnChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    } else {
      setInternalValue("");
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // --- Dynamic CSS Classes ---

  // Base input classes
  const baseInputClasses = `
    w-full peer h-full border rounded-md focus:outline-none transition-all duration-200
    font-inter
    ${
      disabled
        ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
        : ""
    }
    ${
      invalid
        ? "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
        : ""
    }
  `;

  // Variant-specific classes
  const variantClasses = {
    outlined: `border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`,
    filled: `bg-gray-100 border-gray-100 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100`,
    ghost: `border-transparent focus:border-blue-500 bg-transparent text-gray-900 dark:text-gray-100`,
  };

  // Size-specific classes
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const actualInputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`relative flex flex-col font-inter ${className}`}>
      {label && (
        <label
          htmlFor={`input-${label}`}
          className={`mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 ${
            disabled ? "opacity-50" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={`input-${label}`} // Unique ID for input
          type={actualInputType}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseInputClasses} ${variantClasses[variant]} ${sizeClasses[size]} `}
        />

        {loading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 mr-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {showClearButton && displayValue && !disabled && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute right-2 p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none ${
              size === "sm" ? "text-xs" : "text-sm"
            }`}
            aria-label="Clear input"
          >
            {/* 'X' icon for clear button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6L18 18" />
            </svg>
          </button>
        )}

        {showPasswordToggle && type === "password" && !disabled && !loading && (
          <button
            type="button"
            onClick={handlePasswordToggle}
            className={`absolute right-2 p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none ${
              size === "sm" ? "text-xs" : "text-sm"
            }`}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Eye icon (visible)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                  <path d="M12 8.25a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5ZM9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0Z" />
                  <path d="M12 3.25c-4.514 0-7.555 2.704-9.32 4.997l-.031.041c-.4.519-.767.996-1.016 1.56c-.267.605-.383 1.264-.383 2.152c0 .888.116 1.547.383 2.152c.25.564.617 1.042 1.016 1.56l.032.041C4.445 18.046 7.486 20.75 12 20.75c4.514 0 7.555-2.704 9.32-4.997l.031-.041c.4-.518.767-.996 1.016-1.56c.267-.605.383-1.264.383-2.152c0-.888-.116-1.547-.383-2.152c-.25-.564-.617-1.041-1.016-1.56l-.032-.041C19.555 5.954 16.514 3.25 12 3.25ZM3.87 9.162C5.498 7.045 8.15 4.75 12 4.75c3.85 0 6.501 2.295 8.13 4.412c.44.57.696.91.865 1.292c.158.358.255.795.255 1.546s-.097 1.188-.255 1.546c-.169.382-.426.722-.864 1.292C18.5 16.955 15.85 19.25 12 19.25c-3.85 0-6.501-2.295-8.13-4.412c-.44-.57-.696-.91-.865-1.292c-.158-.358-.255-.795-.255-1.546s.097-1.188.255-1.546c.169-.382.426-.722.864-1.292Z" />
                </g>
              </svg>
            ) : (
              // Eye-off icon (hidden)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M22.295 6.31a.75.75 0 0 1 .394.986L22 7l.69.296v.001l-.002.003l-.003.007l-.01.024l-.039.084a13.858 13.858 0 0 1-.727 1.321a15.053 15.053 0 0 1-1.846 2.394l.968.969a.75.75 0 0 1-1.06 1.06l-1.001-1a11.548 11.548 0 0 1-2.274 1.497l.934 1.435a.75.75 0 1 1-1.258.818l-1.089-1.674c-.78.255-1.623.428-2.532.49V16.5a.75.75 0 0 1-1.5 0v-1.775a10.46 10.46 0 0 1-2.46-.466l-1.074 1.65a.75.75 0 1 1-1.258-.818l.913-1.402a11.503 11.503 0 0 1-2.293-1.49l-.96.96a.75.75 0 0 1-1.061-1.06l.924-.924A15.03 15.03 0 0 1 1.514 7.72a9.524 9.524 0 0 1-.188-.388l-.01-.025l-.004-.007v-.003H1.31L2 7l-.69.296a.75.75 0 0 1 1.379-.592v.002l.007.014l.029.063a12.39 12.39 0 0 0 .65 1.177c.475.76 1.197 1.747 2.18 2.662c.867.805 1.928 1.546 3.197 2.034A8.97 8.97 0 0 0 12 13.25a8.963 8.963 0 0 0 3.312-.619c1.262-.497 2.316-1.243 3.175-2.049a13.303 13.303 0 0 0 2.789-3.8l.028-.063l.006-.013v-.001m.985-.394a.75.75 0 0 0-.984.394l.984-.394ZM2.69 6.704Z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {helperText && !errorMessage && (
        <p
          className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${
            disabled ? "opacity-50" : ""
          }`}
        >
          {helperText}
        </p>
      )}
      {errorMessage && (
        <p
          className={`mt-1 text-sm text-red-500 dark:text-red-400 ${
            disabled ? "opacity-50" : ""
          }`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
