"use client";

import Navbar from "@/components/Navbar";
import PurpleButton from "@/components/PurpleButton";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import search from "@/assets/icons/Search.svg";
import Image from "next/image";
import CircleCard from "@/components/CircleCard";
import lorax from "@/assets/images/Lorax.jpg";

export default function Dashboard() {
  const authContextValue = useAuth();
  const isAuthenticated = authContextValue?.currentUser;
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col gap-4 px-35 py-20">
        {/* Header */}
        <div className="flex justify-between items-center gap-0.5">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-3xl font-medium">Circles</h1>
            <div className="w-[120%] h-[5px] bg-weekly-purple rounded" />
          </div>
          <Link href="/create-circle">
            <PurpleButton width="w-32" height="h-10" label="Create" />
          </Link>
        </div>

        {/* Search bar */}
        <div className="w-full h-10 bg-grey-3 rounded-[100px] flex items-center px-3 shadow-md gap-2">
          <Image src={search} alt="search" />
          <p className="font-light text-grey-40">Search</p>
        </div>

        {/* Circle Cards */}
        <div className="flex flex-wrap gap-4">
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
          <CircleCard name="Lorax" photo={lorax.src} />
        </div>
      </div>
    </div>
  );
}
