export default function PurpleButton({
  width,
  height,
  label,
}: {
  width: string;
  height: string;
  label: string;
}) {
  return (
    <button
      className={`${width} ${height} bg-weekly-purple text-white rounded-2xl font-medium cursor-pointer`}
    >
      {label}
    </button>
  );
}
