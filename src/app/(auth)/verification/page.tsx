import Link from "next/link";
import Image from "next/image";
import polaroid from "@/assets/images/Polaroid.png";
import planet from "@/assets/icons/Planet.svg";
import PurpleButton from "@/components/PurpleButton";

export default function Verification() {
  return (
    <div className="w-screen h-screen">
      {/* Left side with logo and signup form */}
      <div className="w-[55%] absolute h-screen z-10 bg-white rounded-r-4xl px-47 flex items-center">
        <Link href="/">
          <Image src={planet} alt="planet" className="absolute top-5 left-7" />
        </Link>
        <div className="w-full flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-semibold text-weekly-purple">
              Verification
            </h1>
            <p className="font-light text-grey-50">
              Please check your email for the verification link.
            </p>
          </div>
          <PurpleButton width="w-full" height="h-11" label="Log In" />
        </div>
      </div>

      {/* Right side background image */}
      <div className="w-[48%] h-screen right-0 absolute z-0">
        <Image src={polaroid} alt="polaroid" fill />
      </div>
    </div>
  );
}
