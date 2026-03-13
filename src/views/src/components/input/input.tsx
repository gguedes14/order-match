import "../../styles/components/input.css";

type InputProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function Input({ value, placeholder, onChange }: InputProps) {
  return (
    <input
      className="input"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
