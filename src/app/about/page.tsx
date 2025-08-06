"use client";

import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

export default function About() {
  const authContextValue = useAuth();
  console.log(authContextValue?.currentUser);
  return (
    <div>
      <Navbar />
    </div>
  );
}
