"use client";

import * as React from "react";
import RealtorForm from "@/components/forms/realtors/RealtorForm";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Header } from "@/components/header";
import Image from "next/image";
import landingPageImage from "/public/images/landingpage_image4.jpg";
import LandingPageSearch from "@/components/landing-page-search";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <div className="absolute h-full w-full">
        <main className="flex flex-col items-center justify-between bg-gradient-to-b from-black/50 z-10">
          <ThemeWrapper>
            <Image
              src={landingPageImage}
              alt="Landing Page Image"
              className="absolute object-cover -z-10 h-[1000px]"
              // style={{ objectFit: "cover" }}
            />
            <div className="relative rounded-md overflow-hidden h-[1000px] mt-[64px]">
              <div className="w-full h-64">
                <div className="flex flex-col items-start justify-center sm:px-10 p-6">
                  <div className="text-left pt-24">
                    <h1 className="text-8xl font-bold text-white">
                      FIND YOUR DREAM HOME
                    </h1>
                    <p className="text-white text-lg pl-1 mt-4 font-bold">
                      Search for homes in your area
                    </p>
                  </div>
                  <div className="w-full px-16 flex justify-center">
                    <div className="sm:w-96 md:w-[650px] lg:w-[1000px] self-center pt-40 xl:w-full ">
                      <LandingPageSearch />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ThemeWrapper>
        </main>
      </div>
    </div>
  );
}
