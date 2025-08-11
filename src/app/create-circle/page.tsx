"use client";

import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import PurpleButton from "@/components/PurpleButton";
import PhotoInput from "@/components/PhotoInput";
import { createCircle } from "@/firebase/queries";

export default function CreateCircle() {
  const [circleName, setCircleName] = useState("");
  const [photo, setPhoto] = useState("");
  const authContextValue = useAuth();
  const isAuthenticated = authContextValue?.currentUser;
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  async function handleCreateCircle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createCircle(circleName, authContextValue?.currentUser?.uid ?? "", photo);

    router.push("/dashboard");

    setCircleName("");
    setPhoto("");
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
            <Input
              label="Circle Name"
              type="text"
              value={circleName}
              onChange={(e) => setCircleName(e.target.value)}
              placeholder="Name"
            />
            <PurpleButton width="w-full" height="h-10" label="Create" />
          </form>
        </div>
      </div>
    </div>
  );
}
