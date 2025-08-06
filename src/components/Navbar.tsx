"use client";

import Link from "next/link";
import planet from "@/assets/icons/Planet.svg";
import Image from "next/image";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="w-full h-[4rem] flex justify-between px-10 items-center">
      {/* Logo section */}
      <div className="flex items-center gap-2">
        <Image src={planet} alt="planet" />
        <h1 className="font-ibm-plex-mono text-2xl font-semibold text-weekly-purple">
          weekly
        </h1>
      </div>

      {/* Navigation links */}
      <div className="flex items-center gap-16">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium px-3 py-1 hover:bg-gray-200 rounded"
          >
            {link.label}
            {pathname === link.href && (
              <motion.div
                className="h-[3px] bg-weekly-purple rounded"
                layoutId="underline"
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        ))}
      </div>

      {/* Authentication links */}
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
    </nav>
  );
}
