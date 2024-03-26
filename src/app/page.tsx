"use client";

import * as React from "react";
import Property from "@/components/forms/property";
import { Slider } from "@/components/ui/splideCarousel";
import VersionFrame from "@/components/VersionFrame/VersionFrame";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Property />
      <VersionFrame />
      <div className="w-96">
        <Slider />
      </div>
    </main>
  );
}
