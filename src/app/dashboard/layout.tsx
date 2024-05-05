import React from "react";
import SideBar from "./sideBar";
import DashboardHeader from "./dashboardHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr] lg:grid-cols-[256px_1fr]">
      <SideBar />
      <div className="flex flex-col overflow-hidden relative">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
