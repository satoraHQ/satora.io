import TokenRoutePage, { tokenRouteMetadata } from "@/components/sections/TokenRoutePage";

export const metadata = tokenRouteMetadata("usat", "from-bitcoin");

export default function Page() {
  return <TokenRoutePage token="usat" direction="from-bitcoin" />;
}
