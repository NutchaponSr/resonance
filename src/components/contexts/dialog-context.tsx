"use client";

import { useEffect, useState } from "react";
import { SettingDialog } from "../setting-dialog";

export const DialogContext = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingDialog />
    </>
  )
}