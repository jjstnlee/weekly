"use client";
import Navbar from "@/components/Navbar";
import { fetchCircleData } from "@/firebase/queries";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import VideoInput from "@/components/VideoInput";
import { useAuth } from "@/contexts/AuthContext";
import Orbit from "@/components/Orbit";

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

      <div className="flex flex-col justify-center items-center py-30">
        <Orbit circleData={circleData} />
      </div>
    </div>
  );
}
