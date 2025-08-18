"use client";
import Navbar from "@/components/Navbar";
import { fetchCircleData } from "@/firebase/queries";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import VideoInput from "@/components/VideoInput";
import { useAuth } from "@/contexts/AuthContext";

export default function CirclePage({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) {
  const { circleId } = use(params);
  const {
    data: circleData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["circle", circleId],
    queryFn: () => fetchCircleData(circleId),
  });
  const authContextValue = useAuth();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navbar />

      <div className="flex flex-col gap-4 px-35 py-40">
        {/* Header */}
        <div className="flex justify-between items-center gap-0.5">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-3xl font-medium">Videos</h1>
            <div className="w-[120%] h-[5px] bg-weekly-purple rounded" />
          </div>
          <VideoInput
            userId={authContextValue?.currentUser?.uid ?? ""}
            circleId={circleId}
          />
        </div>
      </div>
    </div>
  );
}
