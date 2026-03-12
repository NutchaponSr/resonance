"use client";

import { cn } from "@/lib/utils";
import { 
  createContext, 
  useCallback, 
  useContext, 
  useEffect, 
  useRef, 
  useState
} from "react";

const MIN_WIDTH = 240;
const MAX_WIDTH = 360;

interface SidebarContextType {
  width: number;
  isCollapsed: boolean;
  isDragging: boolean;
  collapse: () => void;
  expand: () => void;
  toggle: () => void;
  startDragging: (e: React.MouseEvent) => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [width, setWidth] = useState(MIN_WIDTH);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const startX = useRef(0);
  const startWidth = useRef(0);
  const widthBeforeCollapse = useRef(MIN_WIDTH);

  const collapse = useCallback(() => {
    widthBeforeCollapse.current = width;
    setIsCollapsed(true);
    setIsPending(false);
  }, [width]);

  const expand = useCallback(() => {
    setWidth(widthBeforeCollapse.current);
    setIsCollapsed(false);
    setIsPending(true);
  }, []);

  const toggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const startDragging = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    startX.current = e.clientX;
    startWidth.current = isCollapsed ? 0 : width;
  }, [isCollapsed, width]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX.current;
      const newWidth = startWidth.current + delta;

      const clampedWidth = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
      setWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

 
  return (
    <SidebarContext.Provider 
      value={{ 
        width, 
        isCollapsed, 
        isDragging, 
        collapse, 
        expand, 
        toggle, 
        startDragging 
      }}
    >
      <div className={cn(
        "w-screen h-full relative flex bg-background cursor-text grow shrink basis-0",
        isPending && "overflow-x-hidden overflow-y-hidden"
      )}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  
  return context;
}