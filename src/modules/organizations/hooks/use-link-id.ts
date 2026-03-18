"use client";

import { useParams } from "next/navigation";

export const useLinkId = () => {
  const params = useParams<{ link: string }>();
  return params.link;
}