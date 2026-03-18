import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface Props {
  content: string;
  description?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  alignOffset?: number;
  sideOffset?: number;
  children: React.ReactNode;
}

export const Hint = ({
  content,
  description,
  align = "center",
  side = "top",
  alignOffset = 0,
  sideOffset = 0, 
  children,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger 
          asChild 
          onMouseEnter={() => setOpen(true)} 
          onMouseLeave={() => setOpen(false)}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent 
          align={align} 
          side={side} 
          alignOffset={alignOffset} 
          sideOffset={sideOffset}
          onMouseEnter={() => setOpen(false)} 
        >
          <div className="flex flex-col">
            <p className="text-xs font-normal text-white">
              {content}
            </p>
            <p className="text-xs font-normal text-tertiary">
              {description}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}