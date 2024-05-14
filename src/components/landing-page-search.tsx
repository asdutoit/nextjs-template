import React from "react";
import { Input } from "./ui/input_landing_page";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import LandingPageMultiSelect from "./landing-page-multi-select";
import PriceSlider from "./PriceSlider";

const property_types = [
  {
    value: "house",
    label: "House",
  },
  {
    value: "apartments",
    label: "Apartments",
  },
  {
    value: "townhouse",
    label: "Townhouse",
  },
  {
    value: "farm",
    label: "Farm",
  },
  {
    value: "plot",
    label: "Plot / Land",
  },
  {
    value: "commercial",
    label: "Commercial",
  },
  {
    value: "industrial",
    label: "Industrial",
  },
];

export default function LandingPageSearch() {
  return (
    <>
      <Drawer>
        <DrawerTrigger className="text-primary h-full w-full bg-background p-6 rounded-md font-bold shadow-md md:hidden justify-center text-center">
          Search Properties
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="hidden md:flex justify-center items-center h-full bg-background rounded-md overflow-hidden p-3 shadow-md">
        <div className="text-primary h-full w-full">
          <div className="font-bold pl-3 border-r border-slate-200">
            Location
          </div>
          <div className="border-r border-slate-200">
            <Input
              className="bg-transparent border-0"
              placeholder="e.g Seapoint, Somerset West"
            />
          </div>
        </div>
        <div className="text-primary h-full w-full">
          <div className="font-bold pl-3 border-r border-slate-200">
            Property Type
          </div>
          <div className="border-r border-slate-200">
            <LandingPageMultiSelect
              options={property_types}
              defaultValue={[]}
              onValueChange={(value) => console.log(value)}
              placeholder="All"
              variant="inverted"
              animation={0}
            />
          </div>
        </div>
        <div className="text-primary h-full w-full">
          <div className="font-bold pl-3">Price Range</div>
          <PriceSlider title="" />
        </div>
        <div className="flex text-primary h-full justify-center items-center">
          <Button className="font-bold h-16 lg:w-32">Search</Button>
        </div>
      </div>
    </>
  );
}
