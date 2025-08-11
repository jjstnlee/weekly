export default function PurpleButton({
  width,
  height,
  label,
  onClick,
}: {
  width: string;
  height: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${width} ${height} bg-weekly-purple text-white rounded-2xl font-medium cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
