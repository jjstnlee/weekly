import { addUserVideo } from "@/firebase/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function VideoInput({
  userId,
  circleId,
}: {
  userId: string;
  circleId: string;
}) {
  const queryClient = useQueryClient();
  const { status, error, mutate } = useMutation({
    mutationFn: (weeklyVideo: File) =>
      addUserVideo(userId, circleId, weeklyVideo),
    onSuccess: (newVideo) => {
      queryClient.setQueryData(["dashboard", circleId], newVideo);
    },
  });

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      mutate(file);
    }
  }

  return (
    <label>
      <input
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="w-32 h-10 bg-weekly-purple text-white rounded-2xl font-medium cursor-pointer flex justify-center items-center">
        Upload
      </div>
    </label>
  );
}
