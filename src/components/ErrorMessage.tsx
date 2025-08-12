import Image from "next/image";
import errorX from "@/assets/icons/ErrorX.svg";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center">
      <Image src={errorX} alt="error" width={24} height={24} />
      <span className="text-error-red">{message}</span>
    </div>
  );
}
