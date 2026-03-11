"use client";

import { Button } from "@/components/ui/button";

import { useSidebar } from "@/components/contexts/sidebar-context";
import { MenuIcon } from "lucide-react";

export const Header = () => {
  const { isCollapsed, expand } = useSidebar();

  return (
    <header className="bg-background max-w-screen z-100 select-none relative">
      <div className="w-full max-w-screen h-11 opacity-100 transition-opacity relative inset-s-0">
        <div className="contents">
          <div className="flex justify-between items-center overflow-hidden h-11 px-3">
            {isCollapsed && (
              <div className="shrink-0 size-12 -m-3 p-3 -me-1.5 pointer-events-auto">
                <div className="contents">
                  <div className="relative">
                    <Button variant="ghost" size="iconSm" onClick={expand}>
                      <MenuIcon className="size-4.5 block shrink-0 text-icon-primary" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}