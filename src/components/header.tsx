"use client";

import Link from "next/link";
import { Dumbbell, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function Header() {
  const navLinks = [
    { href: "/o-mnie", label: "O mnie" },
    { href: "/oferta", label: "Oferta" },
    { href: "/opinie", label: "Opinie" },
    { href: "/kontakt", label: "Kontakt" },
    { href: "/formularz", label: "Formularz" },
  ];

  return (
    <header className="bg-black text-white py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo_nlt.png"
            alt="Filip Rozmus - Trener Personalny"
            width={136}
            height={148} //136x148
            className="max-w-[40px]"
            quality={80}
          />
          <div>
            <div className="text-xl font-bold">Filip</div>
            <div className="text-[var(--brand-accent)] font-semibold">
              Rozmus
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[var(--brand-accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu - using Shadcn Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Otwórz menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black text-white border-l-gray-800 w-[320px] flex flex-col">
              <SheetHeader>
                <SheetTitle>
                  <div className="text-lg font-bold text-white">
                    Zobacz więcej!
                  </div>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex-1 space-y-2 py-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="block px-4 py-3 hover:text-[var(--brand-accent)] hover:bg-gray-900 rounded-lg transition-all duration-200 font-medium"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <Separator className="bg-gray-800" />

              <SheetFooter className="pt-6 text-center">
                <div className="w-full">
                  <p className="text-gray-400 text-sm mb-4">
                    Gotowy na przemianę?
                  </p>
                  <SheetClose asChild>
                    <Link
                      href="/kontakt"
                      className="inline-block bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Skontaktuj się
                    </Link>
                  </SheetClose>
                  <p className="text-gray-500 text-xs mt-8">
                    © {new Date().getFullYear()} Filip Rozmus
                  </p>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
