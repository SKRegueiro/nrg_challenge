"use client";
import "@/styles/globals.css";
import DashboardNav from "@/app/dashboard/ui/dashboardNav";
import { SessionProvider, signOut } from "next-auth/react";
import { changePassword } from "@/app/dashboard/actions/changePassword";
import { toast } from "@/hooks/use-toast";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const handleChangePassword = async (formData: FormData) => {
    const { message, success } = await changePassword(formData);

    return success
      ? toast({ title: "Password changed", description: message })
      : toast({
          title: "Uh! Something went wrong.",
          description: message,
        });
  };

  const handleLogOut = async () => {
    //TODO: this is creating a problem with the authenticated api calls
    await signOut();
  };

  return (
    //TODO: make sure where to put this provider
    <SessionProvider>
      <DashboardNav
        onChangePassword={handleChangePassword}
        onLogOut={handleLogOut}
      />
      {children}
    </SessionProvider>
  );
}
