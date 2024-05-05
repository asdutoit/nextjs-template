import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Listings</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no listings
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling / renting as soon as you add a listing.
          </p>
          <Link href="/dashboard/listings/new">
            <Button className="mt-4">Add Listing</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
