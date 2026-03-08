"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useSignInMutationOptions } from "@/lib/auth-client";

import { Line } from "@/components/ui/line";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Social } from "@/modules/auth/ui/components/social";
import Link from "next/link";

export const SignInView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const signIn = useMutation(useSignInMutationOptions({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      setError(error.message);
    },
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    signIn.mutate({ 
      email,
      password,
      callbackURL,
    });
  };

  return (
    <>
      <Line label="Sign in with" />
      <Social disabled={signIn.isPending} />
      <Line label="Or continue with" />
      <form className="pt-4 flex flex-col gap-2.5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <Label className="text-secondary">Email</Label>
          <Input
            required
            type="email"
            placeholder="Enter your email address..."
            disabled={signIn.isPending}
            className="h-9"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-secondary">Password</Label>
          <Input
            required
            type="password"
            placeholder="Enter your password..."
            disabled={signIn.isPending}
            className="h-9"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Link href="/auth/forget-password" className="text-xs text-tertiary hover:underline w-fit">Forgot password?</Link>
        </div>

        <Button 
          size="lg"
          type="submit"
          disabled={signIn.isPending}
        >
          Continue
        </Button>

        <div className="text-center text-xs text-secondary">
          Don't have an account? {" "}
          <Link href="/auth/sign-up" className="text-xs text-tertiary hover:underline w-fit">Sign up</Link>
        </div>
      </form>

      <div className="text-destructive text-sm my-3 block w-full text-center">
        {error}
      </div>
    </>
  );
};