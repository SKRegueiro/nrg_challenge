"use client";

import NavBar from "@/app/admin/ui/navBar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
