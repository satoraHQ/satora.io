import TokenRoutePage, { tokenRouteMetadata } from "@/components/sections/TokenRoutePage";

export const metadata = tokenRouteMetadata("tbtc", "from-bitcoin");

export default function Page() {
  return <TokenRoutePage token="tbtc" direction="from-bitcoin" />;
}
