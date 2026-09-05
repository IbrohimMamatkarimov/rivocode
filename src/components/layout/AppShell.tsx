"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Header } from "./Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Header onOpenMenu={() => setMobileNavOpen(true)} />
        <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <main className="px-4 py-7 sm:px-6 lg:px-10 lg:py-9">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
        <footer className="mx-4 mt-6 border-t border-border px-0 py-7 sm:mx-6 lg:mx-10">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 text-xs text-muted-2">
            <p>© {new Date().getFullYear()} RivoCode</p>
            <p className="hidden sm:block">A deliberate place to learn, practice, and ship.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
