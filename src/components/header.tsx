"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserProfileToggle from "@/components/ui/userProfileToggle";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex h-16 w-full flex-col fixed bg-transparent z-10">
      <header
        className={cn(
          "sticky top-0 flex h-16 items-center gap-4 bg-transparent px-4 md:px-6 duration-200",
          isScrolled ? "bg-background border-b" : "bg-transparent"
        )}
      >
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo height="40" width="160" isScrolled={isScrolled} />
          </Link>
          <div className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center">
            <Link
              href="/dashboard"
              className={cn(
                "transition-colors hover:text-foreground",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className={cn(
                "transition-colors hover:text-foreground",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Orders
            </Link>
            <Link
              href="#"
              className={cn(
                "transition-colors hover:text-foreground",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Products
            </Link>
            <Link
              href="#"
              className={cn(
                "transition-colors hover:text-foreground",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Customers
            </Link>
            <Link
              href="#"
              className={cn(
                "transition-colors hover:text-foreground",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Analytics
            </Link>
          </div>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="relative ml-auto flex-initial">
            <UserProfileToggle />
          </div>
        </div>
      </header>
    </div>
  );
}
