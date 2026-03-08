"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const VerifyView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");

  const [send, setSend] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const callbackUrl = searchParams.get("error");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSend(false);
    await authClient.sendVerificationEmail({
      email,
      callbackURL: "/auth/verify",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: () => {
          setSend(true);
          router.push("/auth/verify");
        }
      },
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-5">
        {callbackUrl && !send && ( 
          <div className="text-destructive text-sm">
            {callbackUrl === "invalid_token" || callbackUrl === "token_expired" 
              ? "Your token is invalid or expired please request a new verification email" 
              : callbackUrl === "email_not_verified"
              ? "Please verify your email or request a new verification email"
              : "Oops! Something went wrong. Please try again."
            }
          </div>
        )}

        {send && (
          <div className="text-green-500 text-sm">
            A new verification email has been sent to your inbox.
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input 
              required
              type="email"
              value={email}
              disabled={isPending}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9"
            />
          </div>
          
          <Button size="lg" type="submit" disabled={isPending}>Continue</Button>
        </div>
      </div>
    </form>
  );
}