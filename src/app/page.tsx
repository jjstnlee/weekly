"use client";

import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import plane from "@/assets/icons/Paper_Plane.svg";
import Image from "next/image";

export default function Home() {
  const authContextValue = useAuth();
  const isAuthenticated = authContextValue?.currentUser;
  const router = useRouter();

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  });

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center py-40 gap-20">
        <div className="w-100 flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-weekly-purple text-center">
            Stay connected <br /> anywhere anytime.
          </h1>
          <h2 className="text-xl font-normal text-center">
            Catch up with friends and family no matter how far or busy you are.
          </h2>
          <button
            className="w-full h-11 bg-gradient-to-r from-weekly-purple to-[#221f79]/40 text-white rounded font-normal cursor-pointer flex justify-center items-center gap-2"
            onClick={() => router.push("/signup")}
          >
            Get Started
            <Image src={plane} alt="plane" width={24} height={24} />
          </button>
        </div>

        <div className="w-300 h-249 bg-grey-70 rounded-2xl">Placeholder</div>
      </div>
    </div>
  );
}
