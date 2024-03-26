// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { cn, myLoader } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const splideOptions = {
  rewind: true,
  lazyLoad: "nearby",
  preloadPages: 2,
  pagination: false,
};

const demoImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

type SliderProps = {
  orientation?: "horizontal" | "vertical";
  images?: string[];
  className?: string;
};

export function Slider({
  orientation = "horizontal",
  images = demoImages,
  className,
}: SliderProps) {
  return (
    <div className="overflow-hidden rounded-md shadow-lg">
      <Splide
        options={splideOptions}
        aria-label="Property Image Carousel"
        hasTrack={false}
      >
        <SplideTrack>
          {images.map((image, index) => (
            <SplideSlide key={index}>
              <div className={cn(className ? className : "relative w-96 h-96")}>
                <Image
                  src={image}
                  loader={myLoader}
                  fill
                  sizes="30vw"
                  style={{
                    objectFit: "cover",
                  }}
                  alt={image}
                />
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>

        <div className="splide__arrows">
          <Button
            variant={"outline"}
            size={"icon"}
            className={cn(
              "absolute splide__arrow--next h-8 w-8 rounded-full right-2 hover:scale-105",
              orientation === "horizontal"
                ? "top-1/2 -translate-y-1/2"
                : "-top-12 left-1/2 -translate-x-1/2 rotate-90"
              // className
            )}
            // disabled={!canScrollPrev}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className={cn(
              "absolute splide__arrow--prev h-8 w-8 rounded-full left-2 hover:scale-105",
              orientation === "horizontal"
                ? "top-1/2 -translate-y-1/2"
                : "-top-12 left-1/2 -translate-x-1/2 rotate-90"
              // className
            )}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Splide>
    </div>
  );
}
