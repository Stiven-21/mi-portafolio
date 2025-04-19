interface InputPromps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({
  label,
  name,
  type = "text",
  ...props
}: InputPromps) => (
  <div className="px-2">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 px-2"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      {...props}
      className={`w-full px-4 py-2 shadow-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-md outline-none focus:border-slate-300 dark:focus:border-slate-700 transition text-slate-950 dark:text-white ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    />
  </div>
);
