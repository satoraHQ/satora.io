import TokenRoutePage, { tokenRouteMetadata } from "@/components/sections/TokenRoutePage";

export const metadata = tokenRouteMetadata("wbtc", "to-bitcoin");

export default function Page() {
  return <TokenRoutePage token="wbtc" direction="to-bitcoin" />;
}
