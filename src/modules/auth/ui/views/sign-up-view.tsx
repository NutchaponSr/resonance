"use client";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useSignUpMutationOptions } from "@/lib/auth-client";

import { Line } from "@/components/ui/line";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Social } from "@/modules/auth/ui/components/social";

export const SignUpView = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const signUp = useMutation(useSignUpMutationOptions());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    signUp.mutate({ 
      name,
      email, 
      password 
    }, {
      onSuccess: () => {
        router.refresh();
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };

  return (
    <>
      <Line label="Sign up with" />
      <Social disabled={signUp.isPending} />
      <Line label="Or continue with" />

      <form className="pt-4 flex flex-col gap-2.5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <Label className="text-secondary">Name</Label>
          <Input
            required
            type="text"
            className="h-9"
            placeholder="Enter your name..."
            disabled={signUp.isPending}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-secondary">Email</Label>
          <Input
            required
            type="email"
            className="h-9"
            placeholder="Enter your email address..."
            disabled={signUp.isPending}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-secondary">Password</Label>
          <Input
            required
            type="password"
            className="h-9"
            placeholder="Enter your password..."
            disabled={signUp.isPending}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <Button 
          size="lg"
          type="submit"
          disabled={signUp.isPending}
        >
          Continue
        </Button>

        <div className="text-center text-xs text-secondary">
          Already have an account? {" "}
          <Link href="/auth/sign-in" className="text-xs text-tertiary hover:underline w-fit">Sign in</Link>
        </div>
      </form>

      <div className="text-destructive text-sm my-3 block w-full text-center">
        {error}
      </div>
    </>
  );
};