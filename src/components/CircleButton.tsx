import Image from "next/image";

export default function CircleButton({
  icon,
  onClick,
}: {
  icon: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex justify-center items-center w-17 h-15 bg-weekly-purple rounded-3xl cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={icon}
        alt="circle-button"
        className="w-8 h-8 m-4 cursor-pointer"
      />
    </div>
  );
}
