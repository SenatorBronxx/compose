
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pilot-program", label: "Pilot Program" },
  { href: "/mobile-app", label: "Mobile App" },
  { href: "/drivers", label: "For Drivers" },
  { href: "/survey", label: "Survey" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="https://img.sanishtech.com/u/a26c366da4c6547e1d08ef12436d9afe.png" alt="ERITAS Logo" width={60} height={60} />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setSheetOpen(false)}
            >
              <Image src="https://img.sanishtech.com/u/a26c366da4c6547e1d08ef12436d9afe.png" alt="ERITAS Logo" width={60} height={60} />
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      "transition-colors hover:text-foreground",
                      pathname === link.href
                        ? "text-foreground font-semibold"
                        : "text-foreground/60"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pl-6">
                 <Button asChild className="w-full">
                    <Link href="/enroll-driver">Enroll Now</Link>
                </Button>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="md:hidden flex items-center space-x-2">
            <Image src="https://img.sanishtech.com/u/a26c366da4c6547e1d08ef12436d9afe.png" alt="ERITAS Logo" width={60} height={60} />
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild className="hidden md:flex">
                <Link href="/enroll-driver">Enroll Now</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}

    