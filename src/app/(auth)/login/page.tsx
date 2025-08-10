"use client";

import Link from "next/link";
import Image from "next/image";
import polaroid from "@/assets/images/Polaroid.png";
import planet from "@/assets/icons/Planet.svg";
import Input from "@/components/Input";
import PurpleButton from "@/components/PurpleButton";
import { useState } from "react";
import Divider from "@/components/Divider";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { useAuth } from "@/contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import AuthErrorMessage from "@/components/AuthErrorMessage";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmailError, setInvalidEmailError] = useState("");
  const [wrongPasswordError, setWrongPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const authContextValue = useAuth();

  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setInvalidEmailError("");
    setWrongPasswordError("");

    try {
      setLoading(true);
      const userCredential = await authContextValue?.login(email, password);
      if (!userCredential?.user.emailVerified) {
        setInvalidEmailError("Email not verified");
        authContextValue?.signout();
        setLoading(false);
        return;
      }
      addUserToFirestore(userCredential.user.uid);
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-email") {
          setInvalidEmailError("Invalid email address");
        } else if (error.code === "auth/invalid-credential") {
          setWrongPasswordError("Incorrect password");
        }
        return;
      }
    }

    setEmail("");
    setPassword("");
    setInvalidEmailError("");
    setWrongPasswordError("");
    setLoading(false);
  }

  // Add user to firestore if not already added
  async function addUserToFirestore(userId: string) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userSnap = await getDoc(userDocRef);

      // Return if user already exists
      if (userSnap.exists()) {
        return;
      }
      await setDoc(userDocRef, {
        email: email,
        photoUrl: "",
        displayName: "",
        phone: "",
        onboardingCompleted: false,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
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
            <h1 className="text-3xl font-semibold text-weekly-purple">Login</h1>
            <p className="font-light text-grey-50">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-weekly-purple underline">
                Sign Up
              </Link>
            </p>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
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
              {wrongPasswordError && (
                <AuthErrorMessage message={wrongPasswordError} />
              )}
            </div>
            <PurpleButton width="w-full" height="h-11" label="Log In" />
          </form>
          <div className="flex justify-between items-center">
            <Divider />
            <p className="text-grey-50">or</p>
            <Divider />
          </div>
          <GoogleAuthButton type="Log in" />
        </div>
      </div>

      {/* Right side background image */}
      <div className="w-[48%] h-screen right-0 absolute z-0">
        <Image src={polaroid} alt="polaroid" fill />
      </div>
    </div>
  );
}
