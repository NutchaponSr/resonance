"use client";

import { Loader } from "@/components/loader";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface Props {
  invitationId: string;
}

export const InvitationView = ({ invitationId }: Props) => {
  const router = useRouter();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    authClient.organization.acceptInvitation({ invitationId })
      .then(() => router.replace("/"))
      .catch(console.error);
  }, []);

  return <Loader />;
}