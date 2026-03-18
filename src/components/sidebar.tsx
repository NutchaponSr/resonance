"use client";

import Link from "next/link";

import { 
  GoDatabase, 
  GoQuestion, 
} from "react-icons/go";
import { useRef, useState } from "react";
import { IconType } from "react-icons/lib";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useHover, useScroll } from "@react-hooks-library/core";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCRPC } from "@/lib/crpc";

import { menus } from "@/constants/sidebar";
import { DialogType } from "@/types/dialog";

import { useDialog } from "@/stores/use-dialog";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Hint } from "@/components/hint";
import { useSidebar } from "@/components/contexts/sidebar-context";

import { UserButton } from "@/modules/auth/ui/components/user-button";

export const Sidebar = () => {
  const crpc = useCRPC();
  const { onOpen } = useDialog();

  const {
    width,
    isCollapsed,
    isDragging,
    startDragging
  } = useSidebar();

  const { data: databases } = useSuspenseQuery(crpc.database.getMany.queryOptions());

  const box = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  const sidebarRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);

  const isSidebar = useHover(sidebarRef);
  const isSeparator = useHover(separatorRef);

  useScroll(box, ({ scrollX, scrollY }) => setScroll({ x: scrollX, y: scrollY }));

  return (
    <aside 
      style={{ width: isCollapsed ? 0 : width }}
      className={cn(
        "cursor-default order-1 grow-0 shrink-0 pointer-events-none relative bg-sidebar group/sidebar",
        !isDragging && "duration-200 ease-[ease] transition-[width]",
        isSeparator ? "shadow-[inset_-2px_0_0_#1c13011c]" : "shadow-[inset_-1.25px_0_0_#f0efed]",
        (isSidebar && isCollapsed) ? "z-202" : "z-111"
      )}
    >
      <div className="text-primary-accent font-medium h-full">
        <div className="absolute top-0 inset-s-0 bottom-0 flex flex-col w-0 overflow-visible z-9 pointer-events-none">
          <div 
            ref={sidebarRef}
            style={{ 
              width,
              transform: isCollapsed 
                ? isSidebar
                  ? "translateX(0px) translateY(59px)" 
                  : "translateX(-224px) translateY(59px)"
                : "translateX(0px) translateY(0px)"
            }} 
            className={cn(
              "flex flex-col relative pointer-events-auto",
              !isDragging && "duration-200 ease-[ease] transition-[width,opacity,transform]",
              isCollapsed ? "h-auto opacity-0" : "h-full opacity-100",
              (isSidebar && isCollapsed) && "opacity-100"
            )}
          >
            <div className={cn(
                "absolute top-0 inset-x-0 bottom-0 rounded-e -z-1 bg-background",
                (isSidebar && isCollapsed) && "shadow-[0_20px_24px_0_#1919190d,0_5px_8px_0_rgba(25,25,25,.029),0_0_0_1.25px_#2a1c0012]",
                isCollapsed ? "block" : "hidden",
              )} 
            />
            <div className="flex flex-col h-full w-full justify-between overflow-hidden relative pt-0 ps-0 pb-0">
              <UserButton />
              <div className="grow-0 shrink-0 pb-0 flex flex-col gap-px cursor-pointer mx-2">
                {menus.slice(0, 5).map((menu, index) => (
                  <SidebarMenu key={index} {...menu} onClick={() => {}} />
                ))}
              </div>
              <div className={cn(
                  "shrink-0 transition-shadow h-[1.25px] w-full -mt-[1.25px] z-99",
                  scroll.y > 0 ? "shadow-[0_1.25px_0_var(--muted)]" : "shadow-transparent"
                )} 
              />
              <div className="contents">
                <ScrollArea ref={box} className="grow z-1 pt-1.5 overflow-y-auto overflow-x-hidden">
                  <div className="flex flex-col min-h-full">
                    <div className="flex flex-col gap-3 px-2 pb-5">
                      <div className="flex flex-col gap-1 m-0">
                        <SidebarContent label="Resonance apps">
                          {databases.map((database) => (
                            <SidebarItem 
                              key={database.id} 
                              label={database.title ?? database.pageId} 
                              href={`/${database.id}`} 
                              icon={GoDatabase}
                            />
                          ))}
                        </SidebarContent>
                      </div>
                      <div className="flex flex-col gap-px">
                        {menus.slice(5).map((menu, index) => (
                          <SidebarMenu
                            key={index}
                            {...menu}
                            onClick={
                              menu.label === "Settings"
                                ? () => onOpen(DialogType.PREFERENCES)
                                : () => {}
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
              <div className="block grow-0 shrink-0 basis-auto">
                <div className={cn(
                    "transition-shadow h-[1.25px] w-full -mt-[1.25px]",
                    scroll.y === 1 ? "shadow-transparent" : "shadow-[0_1.25px_0_var(--muted)]"
                  )} 
                />
                <div className="flex items-center justify-between px-3 py-2.5 box-border">
                  <div className="flex">
                    <div className="relative flex items-center">
                      <div
                        role="button"
                        className="select-none transition cursor-pointer inline-flex items-center justify-center gap-0 h-7 w-7 px-0 rounded whitespace-nowrap text-sm font-medium leading-[1.2] text-secondary shrink-0 hover:bg-black/3"
                      >
                        <GoQuestion className="size-4.5 text-icon-secondary block shrink-0 stroke-[0.2]" />
                      </div>
                      <div className="absolute top-1 inset-e-1 pointer-events-none">
                        <div className="bg-blue-500 size-2 block rounded-full border border-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contents">
              <div className="absolute inset-e-0 w-[1.25px] grow-0 z-1 top-0 bottom-0 pointer-events-auto backface-hidden">
                <div 
                  role="separator"
                  ref={separatorRef}
                  onMouseDown={startDragging}
                  className="cursor-col-resize h-full w-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

const SidebarMenu = ({
  label,
  icon: Icon,
  tooltip,
  onClick
}: {
  label: string;
  icon: IconType;
  tooltip: {
    content: string;
    description?: string;
  };
  onClick: () => void;
}) => {
  return (
    <>
      <Hint content={tooltip.content} side="right" align="center" sideOffset={6} description={tooltip.description}>
        <div
          role="button"
          onClick={onClick}
          className="select-none transition cursor-pointer rounded flex mx-0 font-medium hover:bg-black/3"
        >
          <div className="flex items-center w-full text-sm min-h-7 h-7.5 py-1 px-2">
            <div className="shrink-0 grow-0 rounded text-secondary size-5.5 flex items-center justify-center me-2">
              <Icon className="size-4.5 block text-icon-secondary shrink-0 stroke-[0.25]" />
            </div>
            <div className="grow shrink basis-auto whitespace-nowrap min-w-0 overflow-hidden text-ellipsis">
              {label}
            </div>
          </div>
        </div>
      </Hint>
    </>
  );
}

const SidebarContent = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col cursor-pointer">
      <div className="w-full">
        <div className="mb-3 w-full flex flex-col gap-px">
          <div
            role="button"
            className="select-none transition flex items-center rounded h-7.5 px-2 group/sidebar-content hover:bg-black/3"
          >
            <span 
              style={{ textTransform: "initial" }} 
              className="text-xs text-secondary-foreground font-medium group-hover/sidebar-content:text-primary-accent"
            >
              {label}
            </span>
            <ChevronDownIcon className="size-3.5 block text-icon-tertiary shrink-0 ms-1 opacity-0 group-hover/sidebar-content:opacity-100 transition-opacity" />
          </div>

          <div className="block">
            <div className="flex flex-col gap-px">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: IconType;
}) => {
  return (
    <div className="flex flex-col gap-px pb-0">
      <Link href={href} className="flex select-none transition cursor-pointer rounded w-full mx-0 hover:bg-black/3 group/sidebar-item">
        <div className="flex items-center w-full text-sm min-h-7 h-7.5 rounded px-2 py-1">
          <div className="shrink-0 grow-0 size-5.5 flex items-center justify-center me-2 relative">
            <div className="grid">
              <div className="col-start-1 row-start-1 opacity-0 invisible order-0 transition-opacity group-hover/sidebar-item:opacity-100 group-hover/sidebar-item:order-1 group-hover/sidebar-item:visible">
                <div
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log("clicked");
                  }}
                  className="select-none transition cursor-pointer relative flex items-center justify-center size-5 rounded hover:bg-black/3"
                >
                  <ChevronRightIcon className="size-3.5 block text-icon-tertiary shrink-0 stroke-[2.5]" />
                </div>
              </div>
              <div className="col-start-1 row-start-1 opacity-100 order-1 transition-opacity group-hover/sidebar-item:opacity-0 group-hover/sidebar-item:order-0">
                <div className="flex items-center justify-center size-5 rounded">
                  <Icon className="size-4.5 block text-icon-secondary shrink-0 stroke-[0.25]" />
                </div>
              </div>
            </div>
          </div>
          <div className="shrink grow basis-auto whitespace-nowrap min-w-0 overflow-hidden text-clip flex items-center">
            <div style={{ unicodeBidi: "plaintext" }} className="whitespace-nowrap overflow-hidden text-ellipsis font-medium">
              {label}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}