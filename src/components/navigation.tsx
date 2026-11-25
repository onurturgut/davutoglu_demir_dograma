"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  to: string;
  params?: Record<string, string>;
  activeProps?: { className?: string };
  activeOptions?: { exact?: boolean };
  children: ReactNode;
};

export function Link({
  to,
  params,
  activeProps,
  activeOptions,
  className,
  ...props
}: LinkProps) {
  const pathname = usePathname();
  const href = Object.entries(params ?? {}).reduce(
    (value, [key, replacement]) => value.replace(`$${key}`, replacement),
    to,
  );
  const active = activeOptions?.exact
    ? pathname === href
    : pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const merged = [className, active ? activeProps?.className : ""]
    .filter(Boolean)
    .join(" ");
  return <NextLink href={href} className={merged || undefined} {...props} />;
}
