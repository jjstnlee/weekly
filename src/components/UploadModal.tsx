"use client";

import { addUserVideo } from "@/firebase/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import upload from "@/assets/icons/Upload2.svg";
import Image from "next/image";
import { useState } from "react";

export default function UploadModal({
  userId,
  circleId,
  circleName,
  setUploadModalOpen,
}: {
  userId: string;
  circleId: string;
  circleName: string;
  setUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [video, setVideo] = useState<File | undefined>(undefined);
  const queryClient = useQueryClient();
  const { status, error, mutate } = useMutation({
    mutationFn: (weeklyVideo: File) =>
      addUserVideo(userId, circleId, circleName, weeklyVideo),
    onSuccess: (newVideo) => {
      queryClient.setQueryData(["dashboard", circleId], newVideo);
    },
  });

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    setVideo(e.target.files?.[0]);
  }

  function handleUpload() {
    if (!video) return;
    mutate(video);
    setUploadModalOpen(false);
  }

  return (
    <div className="flex flex-col justify-center items-center w-128 h-53 rounded-4xl shadow-md p-10 gap-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50">
      <div className="flex flex-col gap-6 w-full">
        <div className="w-full flex flex-col gap-1">
          <p>Upload Video</p>
          <div className="w-full h-11 flex gap-4 items-center border border-grey-30 rounded-2xl">
            <label className="w-15 h-full">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="w-full h-full bg-weekly-purple text-white rounded-2xl font-medium cursor-pointer flex justify-center items-center">
                <Image src={upload} alt="Upload" />
              </div>
            </label>
            <p>{video?.name}</p>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-4 justify-between">
        <button
          className="w-51 h-10 bg-grey-20 text-white rounded-2xl font-medium cursor-pointer"
          onClick={() => setUploadModalOpen(false)}
        >
          <p>Cancel</p>
        </button>
        <button
          className="w-51 h-10 bg-weekly-purple text-white rounded-2xl font-medium cursor-pointer"
          onClick={() => handleUpload()}
        >
          <p>Upload</p>
        </button>
      </div>
    </div>
  );
}
