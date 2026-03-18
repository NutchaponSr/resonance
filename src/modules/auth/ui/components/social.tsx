import Image from "next/image";

import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useSignInSocialMutationOptions } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

interface Props {
  disabled: boolean;
}

export const Social = ({ disabled }: Props) => {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") || window.location.origin;

  const signInSocial = useMutation(useSignInSocialMutationOptions());

  const onProvider = (provider: "google" | "github") => {
    signInSocial.mutate({ 
      provider, 
      callbackURL,
    });
  };
  
  return (
    <div className="flex flex-col gap-2 my-3">
      <Button variant="outline" size="lg" disabled={disabled} onClick={() => onProvider("google")}>
        <Image 
          src="/google.svg"
          alt="Google"
          width={16}
          height={16}
          className="mr-2"
        />
        Google
      </Button>
      <Button variant="outline" size="lg" disabled={disabled} onClick={() => onProvider("github")}>
        <Image 
          src="/github.svg"
          alt="Github"
          width={16}
          height={16}
          className="mr-2"
        />
        Github
      </Button>
    </div>
  );
}