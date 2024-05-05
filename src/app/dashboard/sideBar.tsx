"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  Bell,
  Building,
  CalendarClock,
  Handshake,
  Home,
  HomeIcon,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import Logo from "@/components/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//TODO: Replace with actual user data
const user = {
  // belongTo: "organization",
  belongTo: "private",
  role: "admin",
  organisation: {
    logo: "",
  },
};

export default function SideBar() {
  const pathname = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block relative h-full w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {user.belongTo === "organization" && user.organisation.logo ? (
              <img
                src={user.organisation.logo}
                alt="logo"
                className="h-10 w-8 rounded-lg"
              />
            ) : (
              <Logo height="40px" width="160" />
            )}
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={cn(
                `${
                  pathname === "/dashboard"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`,
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/orders"
              className={cn(
                `${
                  pathname === "/dashboard/orders"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`,
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="/dashboard/listings"
              className={cn(
                `${
                  pathname === "/dashboard/listings"
                    ? "bg-muted text-primary "
                    : "text-muted-foreground"
                }`,
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              )}
            >
              <HomeIcon className="h-4 w-4" />
              Listings{" "}
            </Link>
            <Link
              href="/dashboard/sales"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Handshake className="h-4 w-4" />
              Sales
            </Link>
            <Link
              href="/dashboard/rentals"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <CalendarClock className="h-4 w-4" />
              Rentals
            </Link>
            {user.belongTo === "organization" && user.role === "admin" && (
              <Link
                href="/dashboard/branches"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Building className="h-4 w-4" />
                Branches
              </Link>
            )}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
