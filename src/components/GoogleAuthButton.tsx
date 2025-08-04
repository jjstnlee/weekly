import Image from "next/image";
import Google from "@/assets/icons/Google.png";

export default function GoogleAuthButton({ label }: { label: string }) {
  return (
    <button className="w-full h-11 bg-white border border-grey-30 rounded-2xl font-normal flex justify-center items-center gap-2">
      <Image src={Google} alt="Google" width={21} height={19} />
      {label}
    </button>
  );
}
