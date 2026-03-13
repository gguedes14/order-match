import "../../styles/components/button.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
