"use client";

import Link from "next/link";
import Image from "next/image";
import VerificationInput from "react-verification-input";

import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useCRPC } from "@/lib/crpc";

import { Button } from "@/components/ui/button";

import { useLinkId } from "@/modules/organizations/hooks/use-link-id";

export const JoinView = () => {
  const crpc = useCRPC();
  const router = useRouter();

  const link = useLinkId();

  const { data: organization, isLoading } = useQuery(crpc.organization.getOne.queryOptions());

  const join = useMutation(crpc.organization.join.mutationOptions());

  const isMember = useMemo(() => organization?.isMember, [organization]);

  useEffect(() => {
    if (isMember) {
      router.push("/");
    }
  }, [isMember, router]);

  const handleComplete = (value: string) => {
    join.mutate({
      link,
      joinCode: value
    }, {
      onSuccess: (id) => {
        router.push("/");;
        toast.success("Workspace joined");
      },
      onError: () => {
        toast.error("Failed to join workspace");
      }
    });
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-sm">
      <Image
        src="/logo.svg"
        width={60}
        height={60}
        alt="Logo"
      />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">
            Join {organization?.name}
          </h1>
          <p className="text-md text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <VerificationInput
          onComplete={handleComplete}
          classNames={{
            container: cn("flex gap-x-2", join.isPending && "opacity-50 cursor-not-allowed"),
            character: "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
          length={6}
        />
      </div>
      <div className="flex gap-x-4">
        <Button
          asChild
          size="lg"
          variant="outline"
        >
          <Link href="/">
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
}