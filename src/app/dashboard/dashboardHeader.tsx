"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UserProfileToggle from "@/components/ui/userProfileToggle";
import Link from "next/link";
import {
  Building,
  Home,
  LayoutDashboard,
  LineChart,
  Menu,
  Package,
  Search,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/inputClient";
import Logo from "@/components/Logo";

type DashboardItem = {
  title: string;
  href: string;
  icon: () => JSX.Element;
};

export const dashboardItems: DashboardItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: () => <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: () => <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: () => <Package className="h-4 w-4" />,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: () => <Users className="h-4 w-4" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: () => <LineChart className="h-4 w-4" />,
  },
];

//TODO: Replace with actual user data
const user = {
  belongTo: "organization",
  // belongTo: "private",
  role: "admin",
  organisation: {
    logo: "",
  },
};

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Logo height="40" width="160" />
            </Link>
            {dashboardItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-lg",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.icon()}
                <span>{item.title}</span>
              </Link>
            ))}
            {user.belongTo === "organization" && user.role === "admin" && (
              <Link
                href="/dashboard/branches"
                className={cn(
                  "flex items-center gap-2 text-lg",
                  pathname === "/dashboard/branches"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Building className="h-4 w-4" />
                Branches
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <UserProfileToggle />
    </header>
  );
}
