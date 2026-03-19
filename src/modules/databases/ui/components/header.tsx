"use client";

import { GoStar } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import { EllipsisIcon, MenuIcon } from "lucide-react";

import { useCRPC } from "@/lib/crpc";

import { Button } from "@/components/ui/button";

import { useSidebar } from "@/components/contexts/sidebar-context";

import { LogButton } from "@/modules/organizations/ui/components/log-button";

interface Props {
  databaseId: string;
}

export const Header = ({ databaseId }: Props) => {
  const crpc = useCRPC();

  const { data: database, isPending } = useQuery(crpc.database.getOne.queryOptions({ id: databaseId }));

  const { isCollapsed, expand } = useSidebar();

  if (isPending || !database) {
    return (
      <header className="bg-background max-w-screen z-100 select-none relative">
        <div className="w-full max-w-screen h-11 opacity-100 transition-opacity relative inset-s-0" />
      </header>
    );
  }

  return (
    <header className="bg-background max-w-screen z-100 select-none relative">
      <div className="w-full max-w-screen h-11 opacity-100 transition-opacity relative inset-s-0">
        <div className="contents">
          <div className="flex justify-between items-center overflow-hidden h-11 px-3">
            {isCollapsed && (
              <div className="shrink-0 size-11 -m-3 p-2 -me-1.5 pointer-events-auto">
                <div className="contents">
                  <div className="relative">
                    <Button variant="ghost" size="iconSm" onClick={expand}>
                      <MenuIcon className="size-4.5 block shrink-0 text-icon-primary" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center leading-[1.2] text-sm h-full grow-0 me-2 min-w-0">
              <Button variant="ghost" size="xs" className="text-primary">
                {database.title}
              </Button>
            </div>
            <div className="grow shrink" />
            <div className="grow-0 shrink-0 flex items-center ps-2.5 justify-between z-101 h-11 opacity-100 transition-opacity">
              <div className="flex items-center">
                <LogButton />
                <Button variant="ghost" size="iconSm">
                  <GoStar className="size-4.5 block shrink-0 text-icon-primary stroke-[0.2]" />
                </Button>
                <Button variant="ghost" size="iconSm">
                  <EllipsisIcon className="size-4.5 block shrink-0 text-icon-primary" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}