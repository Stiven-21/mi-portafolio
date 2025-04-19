interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea = ({ label, name, ...props }: TextAreaProps) => (
  <div className="px-2">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 px-2"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      {...props}
      className={`w-full px-4 py-2 shadow-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-md outline-none focus:border-slate-300 dark:focus:border-slate-700 transition text-slate-950 dark:text-white ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    />
  </div>
);
