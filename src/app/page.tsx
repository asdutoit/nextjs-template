"use client";

import * as React from "react";
import Property from "@/components/forms/properties/property";
import { Slider } from "@/components/ui/splideCarousel";
import RealtorForm from "@/components/forms/realtors/RealtorForm";
import RealtorBranch from "@/components/forms/realtors/RealtorBranch";
import RealtorAgent from "@/components/forms/realtors/RealtorAgent";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { useConfig } from "@/hooks/use-config";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-12">
      <ThemeWrapper>
        <RealtorForm />
      </ThemeWrapper>
      {/* <RealtorBranch />
      <RealtorAgent />
      <Property /> */}
    </main>
  );
}
