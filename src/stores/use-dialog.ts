import { useCallback } from "react";
import { atom, useAtom } from "jotai";

import { DialogType } from "@/types/dialog";

const typeAtom = atom<DialogType>(DialogType.PREFERENCES);
const isOpenAtom = atom<boolean>(false);


export const useDialog = () => {
  const [type, setType] = useAtom(typeAtom);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const onOpen = useCallback((type: DialogType) => {
    setIsOpen(true);
    setType(type);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    type,
    isOpen,
    onOpen,
    onClose,
  }
}