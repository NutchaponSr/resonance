import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PopoverSeparator } from "@/components/ui/popover";

export const LogButton = () => {
  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="sm">
          Edited Mar 7
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="text-sm text-secondary leading-5 font-normal min-w-[300px] px-3 py-1.5">Activity</div>
        <PopoverSeparator />
        <div className="py-2.5 flex flex-col gap-2">
          <div className="flex items-center px-3 gap-2">
            <div className="flex grow shrink basis-0 min-w-0 gap-1">
              <span className="text-xs text-secondary leading-4 shrink-0">Edited By</span>
              <div className="text-xs leading-4 font-medium whitespace-nowrap overflow-hidden text-ellipsis min-w-0 text-primary">PondPopza</div>
            </div>
            <span className="text-xs leading-4 text-tertiary text-end shrink-0">Mar 7</span>  
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}