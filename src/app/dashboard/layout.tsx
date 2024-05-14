import React from "react";
import SideBar from "./sideBar";
import DashboardHeader from "./dashboardHeader";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="grid w-full md:grid-cols-[256px_1fr] lg:grid-cols-[256px_1fr]">
      <SideBar />
      <div className="flex flex-col overflow-hidden relative">
        <DashboardHeader />
        <div className="flex overflow-auto h-[calc(100vh-64px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
