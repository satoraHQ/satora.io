import type * as React from "react";

import { cn } from "@/utils/cn";

function Navbar({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar"
      className={cn(
        "flex items-center justify-between py-2 px-5",
        "border border-gray-200/40 dark:border-white/[0.08]",
        "rounded-full",
        "bg-white/70 dark:bg-white/[0.04]",
        "backdrop-blur-2xl backdrop-saturate-150",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        className,
      )}
      {...props}
    />
  );
}

function NavbarLeft({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-left"
      className={cn("flex items-center justify-start gap-4", className)}
      {...props}
    />
  );
}

function NavbarRight({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-right"
      className={cn("flex items-center justify-end gap-4", className)}
      {...props}
    />
  );
}

function NavbarCenter({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-center"
      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    />
  );
}

export { Navbar, NavbarCenter, NavbarLeft, NavbarRight };
