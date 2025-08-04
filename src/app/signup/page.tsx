"use client";

import { useState } from "react";
import Image from "next/image";
import polaroid from "@/assets/images/Polaroid.png";
import planet from "@/assets/icons/Planet.svg";
import Input from "@/components/Input";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import Divider from "@/components/Divider";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-screen h-screen">
      {/* Left side with logo and signup form */}
      <div className="w-[55%] absolute h-screen z-10 bg-white rounded-r-4xl px-47 flex items-center">
        <Image src={planet} alt="planet" className="absolute top-5 left-7" />
        <div className="w-full flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-semibold text-weekly-purple">
              Create Your Account
            </h1>
            <p className="font-light text-grey-50">
              Already have an account?{" "}
              <Link href="/login" className="text-weekly-purple underline">
                Log In
              </Link>
            </p>
          </div>
          <form className="flex flex-col gap-5">
            <Input
              label="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              label="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Input
              label="Confirm Password"
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </form>
          <AuthButton label="Sign Up" />
          <div className="flex justify-between items-center">
            <Divider />
            <p className="text-grey-50">or</p>
            <Divider />
          </div>
          <GoogleAuthButton label="Sign up with Google" />
        </div>
      </div>

      {/* Right side background image */}
      <div className="w-[48%] h-screen right-0 absolute z-0">
        <Image src={polaroid} alt="polaroid" fill />
      </div>
    </div>
  );
}
