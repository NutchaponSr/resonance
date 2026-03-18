"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useCRPC } from "@/lib/crpc";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

export const OrganizationView = () => {
  const cprc = useCRPC();

  const create = useMutation(cprc.organization.create.mutationOptions());

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    setSlug(slugify(name || ""));
  }, [name]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create.mutate({ name, slug }, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

  return (
    <div className="h-full">
      <div className="bg-foreground h-full w-full overflow-x-scroll">
        <div className="top-4.5 start-4.5 absolute flex items-center z-2 justify-between w-[calc(100%-18px)]">
          <div className="flex items-center gap-1">

          </div>
        </div>
        <main className="flex flex-row h-full min-h-[800px] items-center justify-center pb-8">
          <div className="w-full flex items-center justify-center">
            <form className="ps-0 flex flex-col items-center" onSubmit={handleSubmit}>
              <div className="relative text-center pt-0 pb-8 max-w-[520px] flex flex-col font-normal">
                <div className="font-semibold text-xl leading-[1.3]">
                  How do you want to use Mochi?
                </div>
                <div className="text-xl leading-[1.3] pt-0.5 font-medium text-tertiatry">
                  This helps customize your experience
                </div>
              </div>

              <div className="flex flex-col items-center justify-center mt-7 gap-8 w-full">
                <div className="mt-0 mb-8 w-full flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Organization Name</Label>
                    <Input 
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Organization Slug</Label>
                    <Input 
                      required
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full items-center">
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-[300px]"
                  disabled={create.isPending}
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}