# Transaction pages review — 2026-09-24

Repository `satoraHQ/swap`, branch `transaction-pages`.

## Scope

- 12 pair pages covering BTC ↔ USDC, USDT, WBTC, tBTC, USAT and XAUt.
- Shared pair-scoped widget, with Ethereum as the initial EVM network.
- Route-specific copy, metadata and sitemap entries.
- Shared route explorer immediately before the FAQ, with a central direction toggle, 3 visual Bitcoin network nodes and 6 token links.
- Persistent reverse-pair link for discovery without operating the toggle.
- Contextual links from 2 existing blog posts.
- No additional analytics, wallet connection, funding or transaction execution on the website.

## Checks performed

- `npm run typecheck -- --noEmit` passed.
- `npm run build -- --webpack` passed; all 12 pair pages were statically generated.
- All 12 local pages returned HTTP 200, with 1 H1, the expected self-referencing canonical, sitemap entry, default application asset pair and 6 same-direction pair links.
- All 12 placed the route explorer immediately before “Before you swap”.
- Browser checks at 320 px and 1280 px showed no horizontal document overflow on the shared layout.
- The central toggle changed all 6 link destinations; clicking tBTC → Bitcoin opened the correct page and pair.
- Entering 0.001234567890123456 tBTC produced `sourceAmount=1234567890123456`; reversing the widget preserved the amount as `targetAmount=1234567890123456`.
- The local quote refreshed successfully for the tested tBTC pair. Previous handoff checks covered BTC/USDC and USDT0 amounts.
- `git diff --check` passed.

## Limits and follow-up before release

- No funded swap was executed. These checks are not a wallet compatibility, security or liquidity audit of every network combination.
- The 3 Bitcoin diagram nodes are visual. Dedicated on-chain, Lightning or Arkade pages were not created.
- The existing CTA opens the app in another tab. The app must refresh the quote; the website does not lock the quoted output.
- Reconcile with current `main` before a PR. At review time it contained 89 commits absent from this branch, including website changes; no merge or rebase was performed during this review.
- Build warnings remain for the existing middleware naming convention, a Node dependency deprecation and edge-runtime static generation. They did not fail this build.
- No deployment or indexing check was performed. Additional homepage entry points and supporting articles remain proposals in the interlinking plan.
