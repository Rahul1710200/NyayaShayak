"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "@clerk/nextjs";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to load the auth state
  if (!isLoaded) {
    return null; // or a loader/spinner if you prefer
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
     <Footer />
    </>
  );
}
