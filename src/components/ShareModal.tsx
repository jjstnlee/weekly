import { Circle } from "@/types/schema";
import Input from "./Input";

export default function ShareModal({
  circleData,
  setShareModalOpen,
}: {
  circleData: Circle | undefined;
  setShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-128 h-53 rounded-4xl shadow-md p-10 gap-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50">
      <Input
        type="text"
        label="Invite Code"
        placeholder="Enter the invite code"
        value={circleData?.joinCode || ""}
        disabled={true}
      />
      <div
        className="w-full h-10 flex justify-center items-center bg-grey-20 rounded-2xl cursor-pointer"
        onClick={() => setShareModalOpen(false)}
      >
        <p className="text-white font-medium">Close</p>
      </div>
    </div>
  );
}
