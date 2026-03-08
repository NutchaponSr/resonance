"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  token: string;
}

export const ResetPasswordView = ({ token }: Props) => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    if (newPassword !== confirmPassword) {
      setIsPending(false);
      setError("Passwords do not match");
      return;
    }

    await authClient.resetPassword({
      newPassword,
      token,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: () => {
          router.push("/auth/sign-in");
        },
        onError: (error) => {
          setError(error.error.message);
        },
      },
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>New Password</Label>
            <Input 
              required
              type="password"
              value={newPassword}
              disabled={isPending}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Confirm Password</Label>
            <Input 
              required
              type="password"
              value={confirmPassword}
              disabled={isPending}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-9"
            />
          </div>
          
          <Button type="submit" disabled={isPending}>Continue</Button>
        </div>
      </div>
    </form>
  )
}