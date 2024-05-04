import React from "react";
import { Button } from "@/components/ui/button";

interface InternetPricingCardProps {
  price: string;
  title: string;
  download: number;
  upload: number;
}

export default function InternetPricingCard({
  price,
  title,
  download,
  upload,
}: InternetPricingCardProps) {
  return (
    <div className="grid grid-cols-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 place-content-between">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold dark:bg-gray-800">
          {`R${price}/mo`}
        </div>
      </div>
      <div className="mb-6 space-y-2">
        <p className="text-4xl font-bold">
          {download >= 1000 ? `${download / 1000}` : download}
          <span className="text-2xl font-medium text-gray-500 dark:text-gray-400">
            {download >= 1000 ? "Gbps" : "Mbps"}
          </span>
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          {`Download / ${upload} Mbps Upload`}
        </p>
      </div>
      <Button className="w-full">Sign Up</Button>
    </div>
  );
}
