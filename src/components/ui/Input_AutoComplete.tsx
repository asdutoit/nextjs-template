"use client";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useCallback, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { set } from "zod";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Result } from "@/lib/types";

export default function InputAutoComplete({
  field,
  onResultSelect,
  ...props
}: any) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedOptionIndex((prevIndex) =>
        Math.min(prevIndex + 1, results.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedOptionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && selectedOptionIndex >= 0) {
      e.preventDefault();
      const selectedResult = results[selectedOptionIndex];
      field.onChange({ target: { value: selectedResult.formattedAddress } });
      setResults([]);
      onResultSelect(selectedResult);
    }
  };

  const loadSuggestedOptions = useCallback(
    useDebouncedCallback((inputValue: string) => {
      if (!inputValue || inputValue.length === 0) setResults([]);
      handleAutoCompleteSearch({ searchTerm: inputValue }).then((options) => {
        console.log(options.places);
        setResults(options.places);
        // [*].addressComponents[*].
        // -- [0].shortText: "6"
        // -- [1].longText: "Somme Street"
        // -- [2].longText: "Durbanville"
        // -- [3].longText: "Cape Town"
        // -- [4].longText: "City of Cape Town Metropolitan Municipality"
        // -- [5].shortText: "WC" || [5].longText: "Western Cape"
        // -- [6].shortText: "ZA" || [6].longText: "South Africa"
        // -- [7].shortText: "7550"
        // [*].formattedAddress: "6 Somme St, Durbanville, Cape Town, 7569, South Africa"
        // [*].location.latitude and [*].location.longitude for coordinates: latitude: -33.8249512, longitude: 18.6925113
        // });
      });
    }, 250),
    []
  );

  async function handleAutoCompleteSearch({
    searchTerm,
  }: {
    searchTerm: string;
  }) {
    setLoading(true);
    try {
      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || ``,
            "X-Goog-FieldMask":
              "places.formattedAddress,places.addressComponents,places.location",
          },
          body: JSON.stringify({
            textQuery: searchTerm,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <Input
        {...props}
        onChange={(e) => {
          field.onChange(e);
          loadSuggestedOptions(e.target.value);
        }}
        value={field.value || ""}
        onKeyDown={handleKeyDown}
      />
      {!results
        ? null
        : results.length > 0 && (
            <div className="absolute z-10 w-full bg-popover my-2 shadow-sm">
              <ScrollArea className="h-64 rounded-md border pl-1 pr-3">
                <ul className="mt-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 pb-1">
                  {loading
                    ? "Loading..."
                    : results.map((result, index) => (
                        <div
                          key={index}
                          className={`hover:bg-accent hover:text-accent-foreground rounded-sm hover:cursor-default ${
                            index === selectedOptionIndex
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }`}
                        >
                          <li
                            className="px-3 relative flex w-full select-none items-center rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                            onClick={() => {
                              setSelectedOptionIndex(index);
                              field.onChange({
                                target: { value: result.formattedAddress },
                              });
                              setResults([]);
                              onResultSelect(result);
                            }}
                          >
                            {result.formattedAddress}
                          </li>
                        </div>
                      ))}
                </ul>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          )}
    </div>
  );
}
