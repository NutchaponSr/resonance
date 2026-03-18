"use client";

import { useSidebar } from "@/components/contexts/sidebar-context";

interface Props {
  children: React.ReactNode;
}

export const Main = ({ children }: Props) => {
  const { width, isCollapsed } = useSidebar();

  return (
    <main
      style={{ width: `calc(100vw - ${isCollapsed ? 0 : width}px)`}}
      className="grow-0 shrink flex flex-col bg-background z-1 h-full max-h-full absolute translate-x-0 duration-200 ease-[ease] transition-[width,transform]"
    >
      {children}
    </main>
  );
}