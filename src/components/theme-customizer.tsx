"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { UpdateCSSVariables } from "@/lib/utils";
import { Button } from "./ui/button";
import { useConfig } from "@/hooks/use-config";
import { Theme, themes } from "@/lib/base-themes";
import { useTheme } from "next-themes";
import { Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckIcon,
  InfoCircledIcon,
  MoonIcon,
  ResetIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";

export default function ThemeCustomizer() {
  const [config, setConfig] = useConfig();
  const { resolvedTheme: mode, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const theme = themes.find((theme) => theme.name === config.theme);
    let themeWithUpdatedRadius;
    if (theme) {
      themeWithUpdatedRadius = {
        ...theme,
        cssVars: {
          light: {
            ...theme.cssVars.light,
            radius: `${config.radius}rem`,
          },
          dark: {
            ...theme.cssVars.dark,
            radius: `${config.radius}rem`,
          },
        },
      };
    } else {
      themeWithUpdatedRadius = themes.find((theme) => theme.name === "zinc");
    }

    UpdateCSSVariables(themeWithUpdatedRadius, mode);
    () => setTheme(mode || "system");
  }, [config, mode, setTheme]);

  return (
    <div className="fixed right-0 z-50 m-5 top-12">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="shadow-sm">
            Customise Theme
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mr-5 w-auto">
          <div className="flex justify-between">
            <label htmlFor="primary" aria-details="Base Color" className="">
              Base Color
            </label>
            <input
              type="color"
              id="primary"
              name="primary"
              // value={e.primary.value}
              // onChange={handleChange}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="border" aria-details="Border Color" className="">
              Border Color
            </label>
            <input
              type="color"
              id="border"
              name="border"
              // value={e.border.value}
              // onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Paintbrush className="mr-2 h-4 w-4" />
                  Customize
                </Button>
              </DrawerTrigger>
              <DrawerContent className="p-6 pt-0">
                <Customizer />
              </DrawerContent>
            </Drawer>
            <div className="hidden md:flex">
              <div className="mr-2 hidden items-center space-x-0.5 lg:flex">
                {mounted ? (
                  <>
                    {["zinc", "rose", "blue", "green", "orange"].map(
                      (color) => {
                        const theme = themes.find(
                          (theme) => theme.name === color
                        );
                        const isActive = config.theme === color;

                        if (!theme) {
                          return null;
                        }

                        return (
                          <Tooltip key={theme.name}>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() =>
                                  setConfig({
                                    ...config,
                                    theme: theme.name,
                                  })
                                }
                                className={cn(
                                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs",
                                  isActive
                                    ? "border-[--theme-primary]"
                                    : "border-transparent"
                                )}
                                style={
                                  {
                                    "--theme-primary": `hsl(${
                                      theme?.activeColor[
                                        mode === "dark" ? "dark" : "light"
                                      ]
                                    })`,
                                  } as React.CSSProperties
                                }
                              >
                                <span
                                  className={cn(
                                    "flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]"
                                  )}
                                >
                                  {isActive && (
                                    <CheckIcon className="h-4 w-4 text-white" />
                                  )}
                                </span>
                                <span className="sr-only">{theme.label}</span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              align="center"
                              className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
                            >
                              {theme.label}
                            </TooltipContent>
                          </Tooltip>
                        );
                      }
                    )}
                  </>
                ) : (
                  <div className="mr-1 flex items-center gap-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                )}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Paintbrush className="mr-2 h-4 w-4" />
                    Customize
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="center"
                  className="z-40 w-[340px] rounded-[0.5rem] bg-white p-6 dark:bg-zinc-950"
                >
                  <Customizer />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Customizer() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();
  const [config, setConfig] = useConfig();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Customize
          </div>
          <div className="text-xs text-muted-foreground">
            Pick a style and color for your components.
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          onClick={() => {
            setConfig({
              ...config,
              theme: "zinc",
              radius: 0.5,
              style: "new-york",
            });
          }}
        >
          <ResetIcon />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <div className="flex w-full items-center">
            <Label className="text-xs">Style</Label>
            <Popover>
              <PopoverTrigger>
                <InfoCircledIcon className="ml-1 h-3 w-3" />
                <span className="sr-only">About styles</span>
              </PopoverTrigger>
              <PopoverContent
                className="space-y-3 rounded-[0.5rem] text-sm"
                side="right"
                align="start"
                alignOffset={-20}
              >
                <p className="font-medium">
                  What is the difference between the New York and Default style?
                </p>
                <p>
                  A style comes with its own set of components, animations,
                  icons and more.
                </p>
                <p>
                  The <span className="font-medium">Default</span> style has
                  larger inputs, uses lucide-react for icons and
                  tailwindcss-animate for animations.
                </p>
                <p>
                  The <span className="font-medium">New York</span> style ships
                  with smaller buttons and cards with shadows. It uses icons
                  from Radix Icons.
                </p>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => setConfig({ ...config, style: "default" })}
              className={cn(
                config.style === "default" && "border-2 border-primary"
              )}
            >
              Default
            </Button>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => setConfig({ ...config, style: "new-york" })}
              className={cn(
                config.style === "new-york" && "border-2 border-primary"
              )}
            >
              New York
            </Button>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((theme) => {
              const isActive = config.theme === theme.name;

              return mounted ? (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={theme.name}
                  onClick={() => {
                    setConfig({
                      ...config,
                      theme: theme.name,
                    });
                  }}
                  className={cn(
                    "justify-start",
                    isActive && "border-2 border-primary"
                  )}
                  style={
                    {
                      "--theme-primary": `hsl(${
                        theme?.activeColor[mode === "dark" ? "dark" : "light"]
                      })`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]"
                    )}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={theme.name} />
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Radius</Label>
          <div className="grid grid-cols-5 gap-2">
            {["0", "0.3", "0.5", "0.75", "1.0"].map((value) => {
              return (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={value}
                  onClick={() => {
                    setConfig({
                      ...config,
                      radius: parseFloat(value),
                    });
                  }}
                  className={cn(
                    config.radius === parseFloat(value) &&
                      "border-2 border-primary"
                  )}
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setMode("light")}
                  className={cn(mode === "light" && "border-2 border-primary")}
                >
                  <SunIcon className="mr-1 -translate-x-1" />
                  Light
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setMode("dark")}
                  className={cn(mode === "dark" && "border-2 border-primary")}
                >
                  <MoonIcon className="mr-1 -translate-x-1" />
                  Dark
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
