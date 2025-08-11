import Image from "next/image";
import camera from "@/assets/icons/Camera.svg";
import { useRef } from "react";

export default function PhotoInput({
  photo,
  setPhoto,
}: {
  photo: string;
  setPhoto: (photo: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhoto(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <label>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div
        className="w-45 h-45 bg-grey-10 rounded-full cursor-pointer flex justify-center items-center overflow-hidden relative"
        style={{
          backgroundImage: photo ? `url(${photo})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!photo && <Image src={camera} alt="camera" width={70} height={70} />}
      </div>
    </label>
  );
}
