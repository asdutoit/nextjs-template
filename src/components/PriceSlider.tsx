"use client";

import React, { Fragment, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { numFormatter } from "@/lib/numFormatter";
import { SliderRange } from "./ui/slider-range";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

type Props = {
  min: number;
  max: number;
  rangePrices: number[];
  setRangePrices: (rangePrices: number[]) => void;
};

const PriceSlider = ({
  min = 0,
  max = 200000000,
  title,
}: {
  min?: number;
  max?: number;
  title?: string;
}) => {
  const [rangePrices, setRangePrices] = useState([min, max]);
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("R" || "R");

  const handleInput = (e: {
    target: { name: string; value: string | number };
  }) => {
    if (e.target.name === "minPrice") {
      if (typeof e.target.value !== "number") {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }
      if (Number(e.target.value) < min) {
        e.target.value = min;
      }
      setRangePrices([Number(e.target.value), rangePrices[1]]);
    } else {
      if (typeof e.target.value !== "number") {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }
      if (Number(e.target.value) > max) {
        e.target.value = max;
      }
      setRangePrices([rangePrices[0], Number(e.target.value)]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent w-full p-3">
          <div className="w-44 flex-1 md:w-44">
            {title && (
              <span className="text-xs font-bold leading-snug text-black">
                Price Range
              </span>
            )}
            <div className="flex justify-between">
              <div>
                <span className="text-left overflow-hidden text-muted-foreground font-semibold leading-snug">
                  <span className="line-clamp-1 leading-snug">
                    {rangePrices[0] === min
                      ? "Any"
                      : currency + numFormatter(rangePrices[0])}{" "}
                    -{" "}
                    {rangePrices[1] === max
                      ? "Any"
                      : currency + numFormatter(rangePrices[1])}
                  </span>
                </span>
              </div>
              <div className="">
                <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
              </div>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Card className="w-full">
          <CardContent className="w-full">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-4 pt-6">
                  <Label htmlFor="framework">Price Range</Label>
                  <SliderRange
                    value={[rangePrices[0], rangePrices[1]]}
                    max={max}
                    min={min}
                    step={100000}
                    onValueChange={(e) => setRangePrices(e)}
                  />
                </div>
                <div className="flex">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="minPrice">Min</Label>
                    <Input
                      id="minPrice"
                      placeholder="Min Price"
                      name="minPrice"
                      value={rangePrices[0] <= 0 ? "Any" : rangePrices[0]}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Max</Label>
                    <Input
                      id="maxPrice"
                      placeholder="Max Price"
                      name="maxPrice"
                      value={rangePrices[1] >= max ? "Any" : rangePrices[1]}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setRangePrices([min, max])}
            >
              Reset
            </Button>
            <Button>Apply</Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default PriceSlider;
