import { getSwapAssets } from "@/lib/swap-assets";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const assets = await getSwapAssets();
    return NextResponse.json(
      assets.map(({ quoteChain: _quoteChain, quoteToken: _quoteToken, ...asset }) => asset),
      { headers: { "Cache-Control": "public, max-age=60, s-maxage=300" } },
    );
  } catch {
    return NextResponse.json(
      { error: "The supported asset list is temporarily unavailable" },
      { status: 502 },
    );
  }
}
