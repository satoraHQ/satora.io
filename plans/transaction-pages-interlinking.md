# Transaction pages — local rollout and internal linking plan

Prepared 2026-09-24. Repository `satoraHQ/swap`, branch `transaction-pages`.
Local preparation only. This is not a deployment or confirmation that production has these pages.

## Page inventory

| Route | Intent | Specific content | Status |
| --- | --- | --- | --- |
| `/swap/bitcoin-to-usdc` | Convert BTC to USDC | Bitcoin funding networks, receiving network, fresh wallet, gas and conditional 1inch guidance | Existing local pilot, revised |
| `/swap/usdc-to-bitcoin` | Use USDC to receive BTC | Source USDC network, BTC versus wrapped tokens, on-chain/Lightning/Arkade receiving details | New local page |
| `/swap/bitcoin-to-usdt` | Convert BTC to Tether | USDT versus USDT0, recipient requirements, no implied TRC20 support, spending gas | New local page |
| `/swap/usdt-to-bitcoin` | Use Tether to receive BTC | Exact source token/network, approvals, BTC destination, net output | New local page |

All pages reuse the homepage swap widget and hand off assets and the user-entered amount to `app.satora.io`. The app refreshes the other side of the quote; do not promise an unchanged quote or a completed swap on the website.

The 3 new pages share a server-rendered layout, but their copy remains explicit in separate page files for human review. The approved USDC pilot is not rewritten as part of this batch. Each page has its own title, description and self-referencing canonical URL. All 4 are listed in the local sitemap.

## Extended token batch — built locally

| Pair | Pages | Verified token networks |
| --- | --- | --- |
| WBTC ↔ BTC | `/swap/wbtc-to-bitcoin`, `/swap/bitcoin-to-wbtc` | Ethereum, Arbitrum, Polygon |
| tBTC ↔ BTC | `/swap/tbtc-to-bitcoin`, `/swap/bitcoin-to-tbtc` | Ethereum, Arbitrum |
| USAT ↔ BTC | `/swap/usat-to-bitcoin`, `/swap/bitcoin-to-usat` | Ethereum |
| XAUt ↔ BTC | `/swap/xaut-to-bitcoin`, `/swap/bitcoin-to-xaut` | Ethereum |

Verified against the live asset list on 2026-09-24. All 8 Ethereum/on-chain-BTC directions returned quotes, using 100,000 sats as the source amount or desired BTC output. This verifies quote availability, not execution of funded swaps or all network combinations.

Exact default IDs are `1:WBTC` (8 decimals), `1:tBTC` (18), `1:USAT` (6), and `1:XAUt` (6). Preserve casing in app URLs. The widget has initial assets for each pair so it never displays an unrelated USDC pair while waiting for the live list.

All 12 pages are now included in the local sitemap. Shared layout and per-token editorial data keep the new pages reviewable. WBTC/tBTC content distinguishes a market swap from issuer/protocol redemption; USAT is explicitly different from USDT; XAUt is gold-backed, not dollar-pegged, and the swap does not deliver physical gold.

Do not immediately multiply these into a page for every chain. First validate these pair pages, then consider network-specific pages only when they solve a genuinely different task and can offer original guidance. Priority here is based on product relevance, not measured keyword volumes.

### Contextual linking proposals — beyond the shared route explorer

- Keep the homepage compact: feature the core USDC/USDT pairs, then a proposed route directory for discovery of all 12 pages. Build that directory only when the navigation plan is approved; no link to an absent directory.
- Every token page now links to its reverse route through a persistent text link below the shared diagram.
- WBTC → BTC and tBTC → BTC link to each other as alternative token balances; BTC → WBTC and BTC → tBTC link to each other as EVM destinations.
- USAT → BTC links to USDC → BTC and USDT → BTC; BTC → USAT links to the corresponding stablecoin destinations.
- XAUt pages link to their reverse route and a future explanatory gold-token article. Do not describe XAUt as a stablecoin or link it as an interchangeable dollar asset.
- Add contextual links from the atomic-swaps guide where its examples genuinely match a route, not a paragraph listing every pair.
- Proposed articles: “WBTC vs tBTC vs native BTC”, “USAT vs USDT when choosing a receiving token”, and “What a Bitcoin-to-XAUt swap delivers”. Each should answer a distinct question and link only to relevant routes.
- Footer should link to a small selection or the future route directory rather than list every chain/token combination.

## Current links in the local branch

- Shared footer → Bitcoin-to-USDC pilot.
- `how-atomic-swaps-work.mdx` → Bitcoin-to-USDC pilot, contextual example added locally.
- `hodlhodl-lightning-integration.mdx` → Bitcoin-to-USDC pilot, secondary use case added locally. Less relevant than the atomic-swaps article; keep only if editorial review finds it useful.
- Each pair page → technical docs and recovery guide, plus normal header/footer navigation.
- All 12 pages include a shared route explorer immediately before “Before you swap”, after the route-specific explanations. It connects 3 Bitcoin networks to 6 EVM tokens. A central button changes link direction; a persistent reverse-pair text link also makes both directions discoverable without interaction.
- Bitcoin network nodes are visual, not separate rail-specific landing pages. Token links lead to pair pages where users choose the network.
- No homepage route block, route directory or new blog post added in this batch. The footer and existing blog links lead into the interconnected pair pages; the proposals below are optional additional entry points.

## Proposed link map

| Source | Destination | Placement / suggested anchor | Reason |
| --- | --- | --- | --- |
| Homepage | All 4 pair pages | Compact “Explore swap routes” block below product explanation; “Bitcoin to USDC”, “USDC to Bitcoin”, “Bitcoin to USDT”, “USDT to Bitcoin” | Discovery without changing the primary app CTA |
| Shared footer | Selected pair pages | Small “Swap routes” group if it stays readable | Persistent navigation; avoid a huge network list |
| Bitcoin → USDC | USDC → Bitcoin | Reverse-pair link in the diagram section, before the FAQ (implemented) | Reverse task |
| Bitcoin → USDC | Bitcoin → USDT | “Receive USDT instead” | Alternative stablecoin |
| USDC → Bitcoin | Bitcoin → USDC | “Swap Bitcoin to USDC” | Reverse task |
| USDC → Bitcoin | USDT → Bitcoin | “Use USDT instead” | Alternative source balance |
| Bitcoin → USDT | USDT → Bitcoin | “Swap USDT back to Bitcoin” | Reverse task |
| Bitcoin → USDT | Bitcoin → USDC | “Receive USDC instead” | Alternative stablecoin |
| USDT → Bitcoin | Bitcoin → USDT | “Swap Bitcoin to USDT” | Reverse task |
| USDT → Bitcoin | USDC → Bitcoin | “Use USDC instead” | Alternative source balance |
| Pair pages | `/blog/how-atomic-swaps-work` | Contextual “How atomic swaps work” link near the explanation | Accessible educational support, alongside technical docs |
| Atomic-swaps article | Bitcoin → USDC | Existing example link; retain | Guide-to-action bridge |

Use ordinary crawlable links with meaningful labels. Do not add every possible link to every paragraph, and do not link to future routes until those pages exist. Keep the Swap button pointed at the application.

## Blog support after the pages are validated

| Proposed topic                                  | Primary page to support                  | Distinct value                                                            |
| ----------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------- |
| Choosing a network to receive USDC from Bitcoin | Bitcoin → USDC                           | Recipient compatibility, native versus bridged token, spending gas        |
| Funding a Lightning wallet with stablecoins     | USDC → Bitcoin; secondary USDT → Bitcoin | Wallet receiving requirements, invoices, amounts and limits               |
| USDT and USDT0 when swapping to or from Bitcoin | Both USDT pages                          | Token/network identification and common mistakes; no generic TRC20 claims |

These are article proposals, not published pages. Avoid copying the landing-page FAQ into a new article solely to create a backlink. Existing relevant posts can support the launch without waiting for new publications.

## Launch checks

- Review each funding and receiving flow, including Lightning; current quotes do not guarantee every wallet can complete a payment.
- Confirm USDT0 labels and original asset IDs survive the handoff.
- Test amounts entered on either side, changing networks, reversal, narrow screens and empty/error quote states.
- Verify canonical URL, title, description and sitemap entry for each route.
- Implement and click-test the agreed link map, including mobile navigation; no links to nonexistent pages.
- Reconcile this older working branch with the team's current `main` before a PR. Do not overwrite unrelated fixes.
- Use existing analytics only; no new tracking events added.
- After deployment, check indexing and query performance in Search Console. No ranking or traffic guarantee.

## Sources

- [Satora supported tokens and directions](https://docs.satora.io/quotes-rates/supported-tokens)
- [Google guidance on crawlable and contextual links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
