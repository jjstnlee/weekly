import { Circle } from "@/types/schema";
import { motion } from "motion/react";

const ORBIT_RADIUS = 250;

export default function Orbit({
  circleData,
}: {
  circleData: Circle | undefined;
}) {
  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
      {/* Central Image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <img
          src={circleData?.photoUrl ?? ""}
          alt={circleData?.name ?? ""}
          width={200}
          height={200}
          className="w-40 h-40 object-cover rounded-full"
        />
        <h2 className="mt-2 text-xl font-mono">{circleData?.name}</h2>
      </div>

      {/* Rotating Orbit */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{
          width: `${2 * ORBIT_RADIUS}px`,
          height: `${2 * ORBIT_RADIUS}px`,
          marginLeft: `-${ORBIT_RADIUS}px`,
          marginTop: `-${ORBIT_RADIUS}px`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 50,
          ease: "linear",
        }}
      >
        {circleData?.members.map((member, i) => {
          const angle = (360 / circleData.members.length) * i;
          const rad = (angle * Math.PI) / 180;
          const x = ORBIT_RADIUS * Math.cos(rad);
          const y = ORBIT_RADIUS * Math.sin(rad);

          return (
            <img
              key={member.uid}
              src={member.photoUrl}
              alt={member.name}
              className="absolute rounded-full w-20 h-20 object-cover"
              width={200}
              height={200}
              style={{
                left: `${ORBIT_RADIUS + x - 40}px`,
                top: `${ORBIT_RADIUS + y - 40}px`,
              }}
              title={member.name}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
