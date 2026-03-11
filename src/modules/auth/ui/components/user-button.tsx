import { TfiCheck } from "react-icons/tfi";
import { BsGearFill, BsPersonFillAdd } from "react-icons/bs";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronsLeftIcon, PlusIcon } from "lucide-react";

import { useCRPC } from "@/lib/crpc";

import { 
  Popover, 
  PopoverContent, 
  PopoverSeparator, 
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useSidebar } from "@/components/contexts/sidebar-context";

import { AuthAvatar } from "@/modules/auth/ui/components/auth-avatar";
import { authClient, useSignOutMutationOptions } from "@/lib/auth-client";

export const UserButton = () => {
  const crpc = useCRPC();
  
  const { isCollapsed, collapse } = useSidebar();
  const { data: session } = authClient.useSession();
  
  const signOut = useMutation(useSignOutMutationOptions());
  const create = useMutation(crpc.organization.create.mutationOptions());

  const { data: organizations } = useSuspenseQuery(crpc.organization.getMany.queryOptions());
  const { data: activeOrganization } = useSuspenseQuery(crpc.organization.getOne.queryOptions());
  
  return (
    <div className="block shrink-0 grow-0">
      <div className="min-w-0 grow shrink basis-0">
        <div className="contents">
          <Popover>
            <PopoverTrigger asChild>
              <div 
                role="button"
                className="select-none transition cursor-pointer flex items-center min-w-0 h-8 w-auto rounded my-1.5 mx-2 hover:bg-black/3 group"
              >
                <div className="flex items-center w-full text-sm min-h-7 h-7.5 py-1 px-2 overflow-hidden ms-0">
                  <AuthAvatar 
                    name={activeOrganization?.name || "?"}
                    className={{
                      container: "flex items-center justify-center size-5.5 rounded! text-primary font-medium me-1.5",
                      fallback: "size-5 rounded! bg-muted text-secondary uppercase flex items-center justify-center",
                    }}
                  />
                  <div className="grow shrink basis-auto whitespace-nowrap min-w-0 overflow-hidden text-ellipsis">
                    <div className="flex items-center justify-start">
                      <div className="flex flex-col me-1.5 mt-0 whitespace-nowrap overflow-hidden text-ellipsis">
                        <div className="flex items-center gap-2">
                          <div 
                            className="font-medium whitespace-nowrap overflow-hidden text-ellipsis leading-5 unicode-bidi text-primary" 
                            style={{ unicodeBidi: "plaintext" }}
                          >
                            {activeOrganization.name}
                          </div>
                        </div>
                      </div>
                      <ChevronDownIcon className="size-4 grow-0 shrink-0 text-icon-secondary block group-hover:visible invisible" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center h-full mx-auto">
                  <div className="items-center inline-flex gap-0.5 me-2">
                    {!isCollapsed && (
                      <div
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          collapse();
                        }}
                        className="select-none transition inline-flex opacity-0 items-center justify-center rounded whitespace-nowrap text-sm font-medium shrink-0 text-icon-secondary overflow-hidden group-hover/sidebar:opacity-100 hover:bg-black/3 size-6 hover:text-primary"
                      >
                        <ChevronsLeftIcon className="size-5 stroke-[1.75] block shrink-0" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent align="start" className="max-w-[calc(-24px+100vw)] w-[300px] relative overflow-hidden">
            <div className="p-3 flex flex-col gap-3">
                <div className="flex flex-row gap-2.5 items-center">
                  <AuthAvatar 
                    name={activeOrganization?.name || "?"}
                    className={{
                      container: "shrink-0 flex items-center justify-center size-9 rounded",
                      fallback: "size-9 rounded bg-[#2a1c0012] text-secondary uppercase flex items-center justify-center text-2xl"
                    }}
                  />
                  <div className="flex flex-col whitespace-nowrap overflow-hidden text-ellipsis">
                    <div className="text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis font-medium">{activeOrganization?.name}
                      
                    </div>
                    <div className="text-xs leading-4 text-secondary whitespace-nowrap overflow-hidden text-ellipsis">Free plan</div>
                  </div>
                </div>
                <div className="inline-flex gap-2">
                  <Button size="sm" variant="outlineSecondary">
                    <BsGearFill />
                    Settings
                  </Button>
                  <Button size="sm" variant="outlineSecondary">
                    <BsPersonFillAdd />
                    Invite members
                  </Button>
                </div>
              </div>
              <PopoverSeparator />
              <div className="flex flex-col min-w-[300px] max-w-[300px] h-full max-h-[min(60vh,420px)]">
                <div className="grow min-h-0 transform-[translateZ(0px)] overflow-x-hidden overflow-y-auto">
                  <div className="leading-5 mt-2 mx-3 flex items-center justify-between text-secondary">
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis text-xs leading-4 font-medium me-1.5">{session?.user?.email}</div>
                  </div>

                  <div className="relative p-1 flex flex-col">
                    {organizations?.map((org) => (
                      <div
                        key={org.id}
                        role="menuitem"
                        className="hover:bg-accent select-none transition cursor-pointer flex flex-row w-full h-8 items-center py-1 px-2 gap-2 rounded"
                      >
                        <div className="grid justify-center items-center">
                          <div className="col-start-1 row-start-1">
                            <AuthAvatar 
                              name={org.name || "?"}
                              className={{
                                container: "flex items-center justify-center size-5 rounded shrink-0",
                                fallback: "rounded size-5 bg-[#2a1c0012] text-secondary uppercase flex items-center justify-center text-sm",
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row w-full items-center min-w-0 gap-1">
                          <div className="text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis min-w-0">{org.name}</div>
                          <span className="ms-auto">
                            <TfiCheck className="stroke-[0.25] size-4 block shrink-0" />
                          </span>
                        </div>
                      </div>
                    ))}
                    <div
                      role="menuitem"
                      onClick={() => create.mutate({ name: "My Organization", slug: "my-organization" })}
                      className="hover:bg-accent select-none transition cursor-pointer flex flex-row w-full h-8 items-center py-1 px-2 gap-2 rounded"
                    >
                      <div className="grid justify-center items-center">
                        <div className="col-start-1 row-start-1">
                          <PlusIcon className="stroke-[1.75] text-blue-500 shrink-0 block size-5" />
                        </div>
                      </div>
                      <div className="flex flex-row w-full items-center min-w-0 gap-1">
                        <div className="text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis min-w-0 text-blue-500">New organization </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shrink-0">
                  <div className="gap-px relative p-1 flex flex-col mt-px">
                    <div className="absolute -top-px inset-x-3 h-[1.25px] bg-border" />
                    <div
                      role="button"
                      onClick={() => signOut.mutate()}
                      className="select-none transition cursor-pointer w-full flex rounded hover:bg-accent"
                    >
                      <div className="flex items-center gap-2 leading-[120%] w-full select-none h-7 text-sm px-2">
                        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                          <div className="flex text-secondary whitespace-nowrap text-xs ps-0 font-medium">
                            Log out
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}