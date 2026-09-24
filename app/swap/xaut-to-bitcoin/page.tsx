import TokenRoutePage, { tokenRouteMetadata } from "@/components/sections/TokenRoutePage";

export const metadata = tokenRouteMetadata("xaut", "to-bitcoin");

export default function Page() {
  return <TokenRoutePage token="xaut" direction="to-bitcoin" />;
}
