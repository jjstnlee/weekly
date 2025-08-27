export default function Input({
  label,
  type,
  value,
  onChange,
  placeholder,
  pattern,
  disabled,
}: {
  label: string;
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  pattern?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <p className="font-normal">{label}</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full h-11 font-light placeholder:text-grey-30 rounded-2xl border border-grey-30 focus:outline-none focus:border-2 focus:border-weekly-purple px-4 py-3"
        placeholder={placeholder}
        pattern={pattern}
        disabled={disabled}
      />
    </div>
  );
}
