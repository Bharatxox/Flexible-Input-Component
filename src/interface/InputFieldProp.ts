export interface InputFieldProps {
  value?: string; // Current value of the input field
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for input changes
  label?: string; // Label for the input field
  placeholder?: string; // Placeholder text for the input
  helperText?: string; // Helper text displayed below the input
  errorMessage?: string; // Error message displayed when invalid
  disabled?: boolean; // If true, the input field is disabled
  invalid?: boolean; // If true, the input field shows an invalid state
  loading?: boolean; // If true, a loading spinner is shown
  variant?: 'filled' | 'outlined' | 'ghost'; // Visual style of the input
  size?: 'sm' | 'md' | 'lg'; // Size of the input field
  type?: 'text' | 'password' | 'email' | 'number'; // HTML input type
  showClearButton?: boolean; // If true, a button to clear the input value is shown
  showPasswordToggle?: boolean; // If true, a toggle button for password visibility is shown
  className?: string; // Additional custom CSS classes for the container
}