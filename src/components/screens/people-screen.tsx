import { toast } from "sonner";

import { useCRPC } from "@/lib/crpc";

import { DialogType } from "@/types/dialog";

import { useDialog } from "@/stores/use-dialog";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

interface Props {
  link: string | null;
  code: string | null;
}

export const PeopleScreen = ({ 
  link, 
  code 
}: Props) => {
  const crpc = useCRPC();
  
  const { isOpen, type } = useDialog();

  const open = isOpen && type === DialogType.PEOPLE;

  const generateLink = useMutation(crpc.organization.generateLink.mutationOptions());

  const onCopyLink = () => {
    if (!link) return;
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/link/${link}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  const onCopyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  if (!open) return null;

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex w-full flex-wrap cursor-default pointer-events-auto relative opacity-100 gap-3 justify-between items-center">
          <div className="grow-3 shrink basis-0 min-w-[200px]">
            <div className="flex flex-col gap-1 justify-start items-start">
              <div className="flex items-center gap-1.5">
                <div className="text-sm font-medium leading-5">Add members via link</div>
              </div>
              <div className="text-secondary text-xs leading-4.5 font-normal text-pretty">
                Only people with permission to invite members to this workspace can view this link. You can also {" "}
                <button className="underline hover:text-destructive transition-colors" onClick={() => generateLink.mutate({})}>generate a new link</button> and also a code. {" "}
                <button className="underline hover:text-destructive transition-colors" onClick={onCopyCode}>
                  ******  
                </button>.
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 flex flex-col justify-start items-end">
            <div className="flex items-center justify-end gap-4 relative">
              <Button variant="secondary" size="sm" onClick={onCopyLink}>
                Copy link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}