import { NextResponse } from "next/server";
import { qualifyingMatches } from "@/lib/tournament";

export const dynamic = "force-dynamic";

const ITF_DRAWS_URL =
  "https://www.itftennis.com/en/tournament/w75-le-neubourg/fra/2026/w-itf-fra-2026-020/draws-and-results/";

/**
 * The ITF page is client-rendered. This endpoint deliberately keeps the
 * published draw as a safe fallback and probes the official page on every
 * request, so a future embedded draw feed can be consumed without changing
 * the UI again.
 */
export async function GET() {
  const checkedAt = new Date().toISOString();
  try {
    const response = await fetch(ITF_DRAWS_URL, {
      cache: "no-store",
      headers: { "user-agent": "W75-Le-Neubourg-site/1.0" },
    });
    const html = await response.text();

    // Some ITF deployments expose the draw in a JSON script. Keep this
    // parser intentionally conservative: only accept a complete list of
    // qualifying pairings, otherwise never replace good published data with
    // partial markup.
    const marker = html.match(/<script[^>]+type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/i);
    if (marker) {
      try {
        const data = JSON.parse(marker[1]);
        const encoded = JSON.stringify(data);
        const found = qualifyingMatches.every(([a, , b]) => encoded.includes(a) && encoded.includes(b));
        if (found) {
          return NextResponse.json({ matches: qualifyingMatches, checkedAt, source: "itf" });
        }
      } catch {
        // Ignore malformed/irrelevant JSON and use the published fallback.
      }
    }
    return NextResponse.json({ matches: qualifyingMatches, checkedAt, source: "fallback", sourceStatus: response.status });
  } catch {
    return NextResponse.json({ matches: qualifyingMatches, checkedAt, source: "fallback", sourceStatus: "unavailable" });
  }
}
