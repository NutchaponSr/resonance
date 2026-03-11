import { 
  BsArrowUpCircleFill, 
  BsArrowUpRightSquare, 
  BsBell, 
  BsDownload, 
  BsEmojiSmile, 
  BsGear, 
  BsGlobe, 
  BsPeople, 
  BsPlugin, 
  BsSliders 
} from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { GoOrganization } from "react-icons/go";

import { cn } from "@/lib/utils";
import { DialogType } from "@/types/dialog";

import { useDialog } from "@/stores/use-dialog";

import { 
  Dialog, 
  DialogContent,
  DialogHidden 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PopoverSeparator } from "@/components/ui/popover";

export const SettingDialog = () => {
  const { isOpen, onClose, type } = useDialog();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl! w-[90vw] h-[calc(100%-100px)]" showCloseButton={false}>
        <DialogHidden />
        <div className="flex flex-row h-full">
          <Sidebar />
          {type}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const Sidebar = () => {
  const { onOpen } = useDialog();

  return (
    <div className="h-full grow-0 shrink-0 w-60 bg-sidebar">
      <div className="flex flex-col justify-between overflow-hidden h-full">
        <ScrollArea className="flex flex-col justify-between p-2 gap-0.5">
          <div 
            role="tablist"
            aria-orientation="vertical"
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col items-stretch gap-0.5">
              <div className="py-1.5 px-2 text-ellipsis overflow-hidden">
                <div className="text-tertiary text-xs leading-4 font-medium">Account</div>
              </div>

              <SidebarTab icon={BsSliders} label="Preferences" onClick={() => onOpen(DialogType.PREFERENCES)} />
              <SidebarTab icon={BsBell} label="Notifications" onClick={() => onOpen(DialogType.NOTIFICATIONS)} />
              <SidebarTab icon={BsPlugin} label="Connections" onClick={() => onOpen(DialogType.CONNECTIONS)} />
            </div>

            <div className="flex flex-col items-stretch gap-0.5">
              <div className="py-1.5 px-2 text-ellipsis overflow-hidden">
                <div className="text-tertiary text-xs leading-4 font-medium">Organization</div>
              </div>

              <SidebarTab icon={BsGear} label="General" onClick={() => onOpen(DialogType.GENERAL)} />
              <SidebarTab icon={BsPeople} label="People" onClick={() => onOpen(DialogType.PEOPLE)} />
              <SidebarTab icon={BsDownload} label="Import" onClick={() => onOpen(DialogType.IMPORT)} />
              <SidebarTab icon={BsGlobe} label="Public Pages" onClick={() => onOpen(DialogType.PUBLIC_PAGES)} />
              <SidebarTab icon={BsEmojiSmile} label="Emoji" onClick={() => onOpen(DialogType.EMOJI)} />
              <SidebarTab icon={BsArrowUpRightSquare} label="Integrations" onClick={() => onOpen(DialogType.INTEGRATIONS)} />
              <SidebarTab icon={GoOrganization} label="Teamspaces" onClick={() => onOpen(DialogType.TEAMSPACES)} />
              <PopoverSeparator className="my-1" />
              <SidebarTab icon={BsArrowUpCircleFill} label="Upgrade plan" richIcon onClick={() => onOpen(DialogType.BILLING)} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

const SidebarTab = ({
  icon: Icon,
  label,
  richIcon,
  onClick,
}: {
  icon?: IconType;
  label: string;
  richIcon?: boolean;
  onClick: () => void;
}) => {
  return (
    <div 
      role="tab" 
      onClick={onClick}
      className="select-none transition cursor-pointer flex items-center justify-between px-1.5 py-1 rounded h-7 hover:bg-accent"
    >
      <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
        <div className="size-6 shrink-0 flex items-center justify-center">
          {Icon && <Icon className={cn("size-4 block text-icon-secondary shrink-0 stroke-[0.2]", richIcon && "text-blue-500 stroke-0")} />}
        </div>
        <div className={cn("text-sm font-medium leading-5 text-primary-accent", richIcon && "text-blue-500")}>{label}</div>
      </div>
    </div>
  );
}