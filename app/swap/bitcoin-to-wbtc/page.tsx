import TokenRoutePage, { tokenRouteMetadata } from "@/components/sections/TokenRoutePage";

export const metadata = tokenRouteMetadata("wbtc", "from-bitcoin");

export default function Page() {
  return <TokenRoutePage token="wbtc" direction="from-bitcoin" />;
}
