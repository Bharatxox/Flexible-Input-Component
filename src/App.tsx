import React, { useEffect, useState } from "react";
import InputField from "./components/InputField";
import ghost from "./assets/ghost.svg";
import outline from "./assets/outline.svg";
import filled from "./assets/filled.svg";
// import sun from "./assets/sun.svg";
// import moon from "./assets/moon.svg";

const App: React.FC = () => {
  const options = [
    { label: "Filled", value: "filled", icon: filled, active: true },
    { label: "Outlined", value: "outlined", icon: outline, active: false },
    { label: "Ghost", value: "ghost", icon: ghost, active: false },
  ];

  const [textValue, setTextValue] = React.useState("Hello World");
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("secret123");
  const [numberValue, setNumberValue] = React.useState("123");
  const [loadingValue, setLoadingValue] = React.useState("");
  const [selectedVariant, setSelectedVariant] = React.useState<
    "filled" | "outlined" | "ghost"
  >("outlined");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className=" relative min-h-screen font-poppins bg-gray-50 p-6 flex flex-col items-center space-y-8 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 text-center">
        Flexible Input Component Demo
      </h1>
      <div className="absolute top-10 right-20 flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="px-2 py-2 rounded-full bg-gray-500  text-gray-100 dark:bg-gray-400 dark:text-gray-800 transition-all ease-in duration-300 cursor-pointer hover:opacity-100 hover:bg-gray-800 dark:hover:bg-white"
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor">
                <path d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0Z" />
                <path
                  fill-rule="evenodd"
                  d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75ZM4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06Zm15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0ZM1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75Zm19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75Zm-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06Zm-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0ZM12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Z"
                  clip-rule="evenodd"
                />
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10Z"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 space-y-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Input Field
        </h2>
        <div className="flex justify-center gap-6 items-center mb-4">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setSelectedVariant(
                  option.value as "filled" | "outlined" | "ghost"
                )
              }
              className={`w-1/4 py-8 rounded-lg transition-colors duration-200 font-medium cursor-pointer ${
                selectedVariant === option.value
                  ? "bg-blue-500 shadow-2xl text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-600"
              }`}
            >
              <div className="p-2 rounded-full flex justify-center items-center">
                <img src={option.icon} alt={option.label} width="40" />
              </div>
              {option.label}
            </button>
          ))}
        </div>
        <InputField
          label="Default Text Input"
          placeholder="Enter your name"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          helperText="This input demonstrates the chosen variant."
          variant={selectedVariant} // Applied selected variant
          size="md"
        />
        <InputField
          label="Disabled Input"
          placeholder="Cannot type here"
          value="Some disabled text"
          disabled
          helperText="This input is always disabled."
          variant={selectedVariant} // Applied selected variant
          size="md"
        />
        <InputField
          label="Invalid Input (Small)"
          placeholder="Enter a valid email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          invalid={true}
          errorMessage="Invalid email address format."
          helperText="Please ensure your email is correct."
          variant={selectedVariant} // Applied selected variant
          size="sm"
          type="email"
        />
        <InputField
          label="Password Input with Toggle (Large)"
          placeholder="Enter your password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          helperText="Click the eye icon to show/hide password."
          variant={selectedVariant} // Applied selected variant
          size="lg"
          type="password"
          showPasswordToggle
        />
        <InputField
          label="Input with Clear Button"
          placeholder="Type and click 'X' to clear"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          helperText="This input includes a clear functionality."
          variant={selectedVariant} // Applied selected variant
          size="md"
          showClearButton
        />
        <InputField
          label="Loading Input"
          placeholder="Fetching data..."
          value={loadingValue}
          onChange={(e) => setLoadingValue(e.target.value)}
          loading={true}
          helperText="This input shows a loading spinner."
          variant={selectedVariant} // Applied selected variant
          size="md"
        />
        <InputField
          label="Number Input"
          placeholder="Enter a number"
          value={numberValue}
          onChange={(e) => setNumberValue(e.target.value)}
          helperText="Only numerical values are accepted here."
          variant={selectedVariant} // Applied selected variant
          size="md"
          type="number"
        />
      </div>
    </div>
  );
};

export default App;
