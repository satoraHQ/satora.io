import { type NextRequest, NextResponse } from "next/server";

const EU_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  // EEA
  "IS",
  "LI",
  "NO",
  // UK (GDPR-equivalent)
  "GB",
]);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only set the cookie once per visitor
  if (!request.cookies.has("geo-eu")) {
    const country = request.headers.get("cf-ipcountry")?.toUpperCase() ?? "";
    const isEuOrUnknown = country === "" || EU_COUNTRIES.has(country);
    response.cookies.set("geo-eu", isEuOrUnknown ? "1" : "0", {
      httpOnly: false, // client-side needs to read it
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  return response;
}

export const config = {
  // Only run on page requests, skip static assets and API routes
  matcher: ["/((?!_next/static|_next/image|favicon|assets|img|api/).*)"],
};
