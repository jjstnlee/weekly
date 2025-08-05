export default function AuthButton({ label }: { label: string }) {
  return (
    <button className="w-full h-11 bg-weekly-purple text-white rounded-2xl font-medium cursor-pointer">
      {label}
    </button>
  );
}
