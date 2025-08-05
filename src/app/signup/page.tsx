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
import { useAuth } from "@/contexts/AuthContext";
import AuthErrorMessage from "@/components/AuthErrorMessage";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalidEmailError, setInvalidEmailError] = useState("");
  const [weakPasswordError, setWeakPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const authContextValue = useAuth();

  const router = useRouter();

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setInvalidEmailError("");
    setWeakPasswordError("");
    setConfirmPasswordError("");

    {
      /* Validate passwords */
    }
    const status = await authContextValue?.validate(password);
    if (!status?.isValid || password !== confirmPassword) {
      if (!status?.isValid) {
        setWeakPasswordError(
          "Weak password. Please choose a stronger password.",
        );
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
      }
      return;
    }

    try {
      setLoading(true);
      await authContextValue?.signup(email, password).then((userCredential) => {
        authContextValue?.setCurrentUser(userCredential.user);
        authContextValue?.verifyEmail(userCredential.user);
        router.push("/verification");
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("invalid-email")) {
          setInvalidEmailError("Invalid email address");
        } else if (error.message.includes("weak-password")) {
          setWeakPasswordError(
            "Weak password. Please choose a stronger password.",
          );
        } else if (error.message.includes("email-already-in-use")) {
          setInvalidEmailError("Email already in use");
        } else {
          setInvalidEmailError("Invalid email address");
        }
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setInvalidEmailError("");
    setWeakPasswordError("");
    setConfirmPasswordError("");
    setLoading(false);
  }

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
              Create Your Account
            </h1>
            <p className="font-light text-grey-50">
              Already have an account?{" "}
              <Link href="/login" className="text-weekly-purple underline">
                Log In
              </Link>
            </p>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSignup}>
            <div className="flex flex-col gap-1">
              <Input
                label="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              {invalidEmailError && (
                <AuthErrorMessage message={invalidEmailError} />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {weakPasswordError && (
                <AuthErrorMessage message={weakPasswordError} />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              ></Input>
              {confirmPasswordError && (
                <AuthErrorMessage message={confirmPasswordError} />
              )}
            </div>
            <AuthButton label="Sign Up" />
          </form>
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
