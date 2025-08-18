import { motion, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const cardRotation = 20;
const cardScale = 1.08;

export default function CircleCard({
  id,
  name,
  photo,
}: {
  id: string;
  name: string;
  photo: string;
}) {
  const xPcnt = useSpring(0, { bounce: 0 });
  const yPcnt = useSpring(0, { bounce: 0 });
  const scale = useSpring(1, { bounce: 0 });

  const router = useRouter();

  const rotateX = useTransform(
    yPcnt,
    [-0.5, 0.5],
    [-cardRotation, cardRotation],
  );
  const rotateY = useTransform(
    xPcnt,
    [-0.5, 0.5],
    [-cardRotation, cardRotation],
  );

  function getMousePosition(e: React.MouseEvent) {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();

    const currentMouseX = e.clientX - left;
    const currentMouseY = e.clientY - top;

    return {
      currentMouseX,
      currentMouseY,
      containerWidth: width,
      containerHeight: height,
    };
  }

  function handleMouseMove(e: React.MouseEvent) {
    const { currentMouseX, currentMouseY, containerWidth, containerHeight } =
      getMousePosition(e);

    xPcnt.set(currentMouseX / containerWidth - 0.5);
    yPcnt.set(currentMouseY / containerHeight - 0.5);
  }

  function handleMouseEnter() {
    scale.set(cardScale);
  }

  function handleMouseLeave() {
    scale.set(1);
    xPcnt.set(0);
    yPcnt.set(0);
  }

  function handleOnClick() {
    router.push("/dashboard/" + id);
  }

  return (
    <motion.div
      className="w-52 min-h-68 bg-gradient-to-b from-[#dfdefc] to-[#807de3] rounded shadow-lg flex flex-col justify-between gap-12 cursor-pointer px-4 pt-4 pb-3"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnClick}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        scale,
      }}
    >
      <div className="w-full h-40 overflow-hidden relative">
        <Image src={photo} alt="circle photo" fill className="object-cover" />
      </div>
      <h2 className="w-full text-2xl font-semibold wrap-anywhere text-white">
        {name}
      </h2>
    </motion.div>
  );
}
