"use client";

import { usePathname } from "next/navigation";

export default function useCurrentUrl() {
  const pathname = usePathname();
  return {pathname};
}
