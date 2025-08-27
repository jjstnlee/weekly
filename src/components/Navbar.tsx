"use client";

import Link from "next/link";
import planet from "@/assets/icons/Planet.svg";
import Image from "next/image";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "@/firebase/queries";

export default function Navbar() {
  const pathname = usePathname();
  const authContextValue = useAuth();
  const isAuthenticated = authContextValue?.currentUser;
  const { data } = useQuery({
    queryKey: [authContextValue?.currentUser?.uid],
    queryFn: () => fetchUserData(authContextValue?.currentUser?.uid ?? ""),
  });

  const navLinks = [
    {
      href: isAuthenticated && data?.onboardingCompleted ? "/dashboard" : "/",
      label: "Home",
    },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="w-full h-[4rem] flex justify-between px-10 items-center fixed bg-white">
      {/* Logo section */}
      <Link href={isAuthenticated ? "/dashboard" : "/"}>
        <div className="flex items-center gap-2">
          <Image src={planet} alt="planet" />
          <h1 className="font-mono text-2xl font-semibold text-weekly-purple">
            weekly
          </h1>
        </div>
      </Link>

      {/* Navigation links */}
      <div className="flex items-center gap-16">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium px-3 py-1 hover:bg-gray-200 rounded"
          >
            {link.label}
            {(pathname === link.href ||
              (link.label === "Home" && !pathname.includes("/about"))) && (
              <motion.div
                className="h-[3px] bg-weekly-purple rounded"
                layoutId="underline"
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        ))}
      </div>

      {isAuthenticated ? (
        <Link href="/profile" className="ml-30">
          <img
            src={data?.photoUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
        </Link>
      ) : (
        <div className="flex items-center gap-7">
          <Link href="/login" className="px-3 py-1 hover:bg-gray-200 rounded">
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-weekly-purple text-white px-7 py-2 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
