"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import planet from "@/assets/icons/Planet.svg";
import Input from "@/components/Input";
import PurpleButton from "@/components/PurpleButton";
import polaroid from "@/assets/images/Polaroid.png";
import PhotoInput from "@/components/PhotoInput";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { completeUserOnboarding, fetchUserData } from "@/firebase/queries";

export default function Welcome() {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const authContextValue = useAuth();
  const isAuthenticated = authContextValue?.currentUser;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: [authContextValue?.currentUser?.uid],
    queryFn: () => fetchUserData(authContextValue?.currentUser?.uid ?? ""),
  });
  const { status, error, mutate } = useMutation({
    mutationFn: () =>
      completeUserOnboarding(
        authContextValue?.currentUser?.uid ?? "",
        name,
        photo,
      ),
    onSuccess: (newUser) => {
      queryClient.setQueryData([authContextValue?.currentUser?.uid], newUser);
      router.push("/dashboard");
      setName("");
      setPhoto("");
      setErrorMessage("");
    },
  });
  const onboardingCompleted = data?.onboardingCompleted;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
    if (onboardingCompleted) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, onboardingCompleted, router]);

  function handleOnboarding(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name) {
      setErrorMessage("Circle name is required");
      return;
    }

    if (!photo) {
      setErrorMessage("Circle photo is required");
      return;
    }

    mutate();
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="w-screen h-screen">
      {/* Left side with logo and signup form */}
      <div className="w-[55%] absolute h-screen z-10 bg-white rounded-r-4xl flex justify-center items-center px-10">
        <Link href="/">
          <Image src={planet} alt="planet" className="absolute top-5 left-7" />
        </Link>
        <div className="w-120 flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-semibold text-weekly-purple">
              Welcome!
            </h1>
            <p className="font-light text-grey-50">
              Tell us a bit about yourself
            </p>
          </div>
          <div className="flex justify-center">
            <PhotoInput photo={photo} setPhoto={setPhoto} />
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleOnboarding}>
            <div>
              <Input
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </div>
            <PurpleButton width="w-full" height="h-11" label="Get Started" />
          </form>
        </div>
      </div>

      {/* Right side background image */}
      <div className="w-[48%] h-screen right-0 absolute z-0">
        <Image src={polaroid} alt="polaroid" fill />
      </div>
    </div>
  );
}
