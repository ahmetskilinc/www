"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { track } from "@vercel/analytics";

type CustomLinkProps = LinkProps & {
  children: React.ReactNode;
  track?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: "noopener noreferrer" | "noreferrer";
  className?: string;
};

export default function CustomLink({ children, ...props }: CustomLinkProps) {
  return (
    <Link {...props} onClick={() => track(props.track || `${props.href}_clicked`)}>
      {children}
    </Link>
  );
}
