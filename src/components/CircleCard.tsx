import Image from "next/image";

export default function CircleCard({
  name,
  photo,
}: {
  name: string;
  photo: string;
}) {
  return (
    <div className="w-57 min-h-68 bg-white rounded-4xl shadow-md flex flex-col justify-center items-center gap-4 cursor-pointer px-10 py-10">
      <div className="w-37 h-37 rounded-full overflow-hidden relative">
        <Image src={photo} alt="circle" fill className="object-cover" />
      </div>
      <h2 className="w-full text-center text-2xl font-normal wrap-anywhere">
        {name}
      </h2>
    </div>
  );
}
