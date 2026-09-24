import TokenRoutePage, { tokenRouteMetadata } from "@/components/sections/TokenRoutePage";

export const metadata = tokenRouteMetadata("tbtc", "to-bitcoin");

export default function Page() {
  return <TokenRoutePage token="tbtc" direction="to-bitcoin" />;
}
