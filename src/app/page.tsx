"use client";

import * as React from "react";
import RealtorForm from "@/components/forms/realtors/RealtorForm";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-12">
        <ThemeWrapper>
          <RealtorForm />
        </ThemeWrapper>
      </main>
    </>
  );
}
