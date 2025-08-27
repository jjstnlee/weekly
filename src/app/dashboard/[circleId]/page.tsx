"use client";

import Navbar from "@/components/Navbar";
import { fetchCircleData } from "@/firebase/queries";
import { useQuery } from "@tanstack/react-query";
import { use, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Orbit from "@/components/Orbit";
import CircleButton from "@/components/CircleButton";
import pencil from "@/assets/icons/Pencil.svg";
import upload from "@/assets/icons/Upload.svg";
import paper_plane from "@/assets/icons/Paper_Plane2.svg";
import UploadModal from "@/components/UploadModal";
import ShareModal from "@/components/ShareModal";

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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const authContextValue = useAuth();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const circleButtons = [
    { icon: pencil, onClick: () => setEditModalOpen(!editModalOpen) },
    { icon: upload, onClick: () => setUploadModalOpen(!uploadModalOpen) },
    { icon: paper_plane, onClick: () => setShareModalOpen(!shareModalOpen) },
  ];

  return (
    <>
      <Navbar />

      {shareModalOpen && (
        <ShareModal
          circleData={circleData}
          setShareModalOpen={setShareModalOpen}
        />
      )}
      {uploadModalOpen && (
        <UploadModal
          userId={authContextValue?.currentUser?.uid || ""}
          circleId={circleId}
          circleName={circleData?.name || ""}
          setUploadModalOpen={setUploadModalOpen}
        />
      )}

      <div className="px-20">
        <div className="flex flex-col justify-center items-center py-30">
          <Orbit circleData={circleData} />
        </div>

        <div className="flex justify-between">
          hi
          <div className="flex gap-2">
            {circleButtons.map((button, index) => (
              <CircleButton
                key={index}
                icon={button.icon}
                onClick={button.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
