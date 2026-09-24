import TokenRoutePage, { tokenRouteMetadata } from "@/components/sections/TokenRoutePage";

export const metadata = tokenRouteMetadata("xaut", "from-bitcoin");

export default function Page() {
  return <TokenRoutePage token="xaut" direction="from-bitcoin" />;
}
