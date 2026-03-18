import { IconType } from "react-icons/lib";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useCRPC } from "@/lib/crpc";

import { categories, CategoryType, DialogType, settingDialogs } from "@/types/dialog";

import { useDialog } from "@/stores/use-dialog";

import {
  Dialog,
  DialogContent,
  DialogHidden
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PopoverSeparator } from "@/components/ui/popover";

import { PeopleScreen } from "@/components/screens/people-screen";

export const SettingDialog = () => {
  const crpc = useCRPC();

  const { isOpen, type, onClose } = useDialog();

  const currentPanel = settingDialogs[type];

  const {
    data: organization,
  } = useQuery({
    enabled: isOpen,
    ...crpc.organization.getOne.queryOptions()
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl! w-[90vw] h-[calc(100%-100px)]">
        <DialogHidden />
        <div className="flex flex-row h-full">
          <Sidebar />
          <div role="tabpanel" className="grow relative z-1 h-full overflow-hidden">
            <div className="flex flex-col h-full w-full bg-background">
              <ScrollArea className="z-1 grow translate-z-0 px-24 py-9 flex justify-center items-start">
                <TabPanel
                  category={currentPanel.category}
                  title={currentPanel.title}
                  description={currentPanel.description}
                  hasDocs={currentPanel.hasDocs}
                >
                  <PeopleScreen link={organization?.link || null} code={organization?.code || null} />
                </TabPanel>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const Sidebar = () => {
  const { type, onOpen } = useDialog();

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

              {Object.entries(settingDialogs)
                .filter(([key, value]) => value.category === "account")
                .map(([key, value]) => (
                  <SidebarTab
                    key={key}
                    icon={value.icon}
                    label={value.title}
                    onClick={() => onOpen(key as DialogType)}
                    active={type === key}
                    richIcon={value.richIcon}
                  />
                )
                )}
            </div>

            <div className="flex flex-col items-stretch gap-0.5">
              <div className="py-1.5 px-2 text-ellipsis overflow-hidden">
                <div className="text-tertiary text-xs leading-4 font-medium">Organization</div>
              </div>

              {Object.entries(settingDialogs)
                .filter(([key, value]) => value.category === "organization")
                .map(([key, value]) => (
                  <SidebarTab
                    key={key}
                    icon={value.icon}
                    label={value.title}
                    onClick={() => onOpen(key as DialogType)}
                    active={type === key}
                    richIcon={value.richIcon}
                  />
                )
                )}
              <PopoverSeparator className="my-1" />
              {Object.entries(settingDialogs)
                .filter(([key, value]) => value.category === "billing")
                .map(([key, value]) => (
                  <SidebarTab
                    key={key}
                    icon={value.icon}
                    label={value.title}
                    onClick={() => onOpen(key as DialogType)}
                    active={type === key}
                    richIcon={value.richIcon}
                  />
                )
                )}
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
  active,
  onClick,
}: {
  icon?: IconType;
  label: string;
  richIcon?: boolean;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      role="tab"
      onClick={onClick}
      className={cn(
        "select-none transition cursor-pointer flex items-center justify-between px-1.5 py-1 rounded h-7 hover:bg-accent",
        active && "bg-accent"
      )}
    >
      <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
        <div className="size-6 shrink-0 flex items-center justify-center">
          {Icon && (
            <Icon className={cn(
              "size-4 block text-icon-secondary shrink-0 stroke-[0.2]",
              richIcon && "text-blue-500 stroke-0",
              active && "text-icon-primary"
            )} />
          )}
        </div>
        <div className={cn(
          "text-sm font-medium leading-5 text-primary-accent",
          richIcon && "text-blue-500",
          active && "text-primary"
        )}>
          {label}
        </div>
      </div>
    </div>
  );
}

export const TabPanel = ({
  category,
  title,
  description,
  hasDocs,
  children
}: {
  category: CategoryType;
  title: string;
  description: string;
  hasDocs?: boolean;
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col gap-9 w-full max-w-full">
      <header className="flex flex-col gap-2">
        <div className="text-secondary text-xs leading-4">{categories[category]}</div>
        <div className="text-2xl leading-8 font-bold">{title}</div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-base leading-6">{description}</div>
          <a href="/" data-docs={hasDocs} className="data-[docs=true]:block hidden text-blue-500 select-none leading-6 decoration-0 text-base">
            Learn more
          </a>
        </div>
      </header>
      <section className="flex flex-col gap-6">
        {children}
      </section>
    </div>
  );
}