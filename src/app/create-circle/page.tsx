"use client";

import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import PurpleButton from "@/components/PurpleButton";
import PhotoInput from "@/components/PhotoInput";
import { createCircle } from "@/firebase/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";

export default function CreateCircle() {
  const [circleName, setCircleName] = useState("");
  const [photo, setPhoto] = useState<File>();
  const [errorMessage, setErrorMessage] = useState("");
  const authContextValue = useAuth();
  const isAuthenticated = authContextValue?.currentUser;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { status, error, mutate } = useMutation({
    mutationFn: () =>
      createCircle(circleName, authContextValue?.currentUser?.uid ?? "", photo),
    onSuccess: (newCircle) => {
      queryClient.setQueryData(
        ["dashboard", authContextValue?.currentUser?.uid],
        newCircle,
      );
      router.push("/dashboard");
      setCircleName("");
      setPhoto(undefined);
      setErrorMessage("");
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  async function handleCreateCircle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!circleName) {
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
    <div>
      <Navbar />

      <div className="w-screen flex justify-center px-10 py-30">
        <div className="w-120 flex flex-col items-center gap-5">
          <PhotoInput photo={photo} setPhoto={setPhoto} />
          <form
            className="flex flex-col gap-5 self-stretch"
            onSubmit={handleCreateCircle}
          >
            <div>
              <Input
                label="Circle Name"
                type="text"
                value={circleName}
                onChange={(e) => setCircleName(e.target.value)}
                placeholder="Name"
              />
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </div>
            <PurpleButton width="w-full" height="h-10" label="Create" />
          </form>
        </div>
      </div>
    </div>
  );
}
