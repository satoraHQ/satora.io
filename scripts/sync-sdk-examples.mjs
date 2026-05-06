#!/usr/bin/env node
/**
 * Syncs SDK example files for documentation code imports.
 *
 * - Local dev:  Copies from the local lendaswap repo (auto-detected or
 *               set via LENDASWAP_LOCAL_PATH env var). Files in websitedocs/
 *               already use the correct names for our docs.
 * - CI / prod:  Fetches from the public github.com/satora/lendaswap-sdk repo.
 *               The SDK repo uses different filenames, so we rename them during
 *               sync (e.g. quote.ts → quotes.ts, info.ts → setup.ts).
 *
 * Usage:
 *   node scripts/sync-sdk-examples.mjs
 *
 * Environment variables:
 *   LENDASWAP_LOCAL_PATH  - Override path to the local lendaswap repo root.
 *                           Defaults: C:/lendaswap (Windows) or
 *                           /home/weltitob/satora/lendaswap (Linux/WSL).
 */

import {
	copyFileSync,
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXAMPLES_DIR = join(
	__dirname,
	"..",
	"content",
	"docs",
	"lendaswap",
	"_examples",
);

// Remote: public SDK repo (used in CI / deploy)
const REPO = "satora/lendaswap-sdk";
const BRANCH = "main";
const REMOTE_BASE = "examples/pure-ts/src/commands";

// Local: private lendaswap repo (source of truth, SDK is released from here)
const LOCAL_SUBPATH = "client-sdk/examples/pure-ts/src/websitedocs";

/**
 * Map from SDK repo filename → local _examples/ filename.
 * Files not listed here are copied as-is.
 * Multiple SDK files can map to the same local name (content is concatenated).
 */
const FILE_RENAME_MAP = {
	"quote.ts": "quotes.ts",
	"info.ts": "setup.ts",
	"swap.ts": [
		"create-btc-to-evm.ts",
		"create-evm-to-btc.ts",
		"create-onchain-to-arkade.ts",
		"error-handling.ts",
	],
	"swaps.ts": "monitor-swaps.ts",
	"redeem.ts": "claim.ts",
	"recover.ts": "recovery.ts",
	"refund.ts": "refund.ts",
	"watch.ts": "monitor-swaps.ts",
};

/** Ordered list of candidate paths for the local lendaswap repo. */
function getLocalRepoPaths() {
	if (process.env.LENDASWAP_LOCAL_PATH) {
		return [process.env.LENDASWAP_LOCAL_PATH];
	}
	return [
		// Windows native
		"C:/lendaswap",
		// WSL home
		"/home/weltitob/satora/lendaswap",
	];
}

function findLocalRepo() {
	for (const base of getLocalRepoPaths()) {
		const candidate = join(base, LOCAL_SUBPATH);
		try {
			if (existsSync(candidate) && statSync(candidate).isDirectory()) {
				return candidate;
			}
		} catch {}
	}
	return null;
}

/**
 * Get the local filename(s) for a given SDK file.
 * If the file maps to multiple names (like swap.ts), returns an array.
 * If no mapping exists, returns the original name.
 */
function getLocalNames(sdkFilename) {
	const mapped = FILE_RENAME_MAP[sdkFilename];
	if (!mapped) return [sdkFilename];
	return Array.isArray(mapped) ? mapped : [mapped];
}

function copyLocalFiles(srcDir) {
	if (existsSync(EXAMPLES_DIR)) {
		rmSync(EXAMPLES_DIR, { recursive: true, force: true });
	}
	mkdirSync(EXAMPLES_DIR, { recursive: true });

	const sdkFiles = readdirSync(srcDir).filter((f) => f.endsWith(".ts"));
	const written = new Set();

	for (const sdkFile of sdkFiles) {
		const content = readFileSync(join(srcDir, sdkFile), "utf-8");
		const localNames = getLocalNames(sdkFile);
		for (const localName of localNames) {
			if (written.has(localName)) {
				// Append to existing file (e.g. watch.ts → monitor-swaps.ts)
				const existing = readFileSync(join(EXAMPLES_DIR, localName), "utf-8");
				writeFileSync(
					join(EXAMPLES_DIR, localName),
					existing + "\n" + content,
					"utf-8",
				);
				console.log(`  ✓ ${sdkFile} → ${localName} (appended)`);
			} else {
				writeFileSync(join(EXAMPLES_DIR, localName), content, "utf-8");
				written.add(localName);
				console.log(`  ✓ ${sdkFile} → ${localName}`);
			}
		}
	}
	return written.size;
}

async function fetchFromGithub() {
	const apiUrl = `https://api.github.com/repos/${REPO}/contents/${REMOTE_BASE}?ref=${BRANCH}`;
	let sdkFiles;
	try {
		const resp = await fetch(apiUrl, {
			headers: { Accept: "application/vnd.github.v3+json" },
		});
		if (resp.ok) {
			const entries = await resp.json();
			sdkFiles = entries
				.filter((e) => e.type === "file" && e.name.endsWith(".ts"))
				.map((e) => e.name);
		}
	} catch {}

	if (!sdkFiles || sdkFiles.length === 0) {
		sdkFiles = [
			"evm-balances.ts",
			"evm-claim.ts",
			"evm-fund.ts",
			"evm-refund.ts",
			"info.ts",
			"pairs.ts",
			"quote.ts",
			"recover.ts",
			"redeem.ts",
			"refund.ts",
			"swap.ts",
			"swaps.ts",
			"watch.ts",
		];
	}

	if (existsSync(EXAMPLES_DIR)) {
		rmSync(EXAMPLES_DIR, { recursive: true, force: true });
	}
	mkdirSync(EXAMPLES_DIR, { recursive: true });

	const written = new Set();

	for (const sdkFile of sdkFiles) {
		const url = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${REMOTE_BASE}/${sdkFile}`;
		const resp = await fetch(url);
		if (!resp.ok) {
			console.error(`  WARN: Failed to fetch ${sdkFile}: ${resp.status}`);
			continue;
		}
		const content = await resp.text();
		const localNames = getLocalNames(sdkFile);
		for (const localName of localNames) {
			if (written.has(localName)) {
				const existing = readFileSync(join(EXAMPLES_DIR, localName), "utf-8");
				writeFileSync(
					join(EXAMPLES_DIR, localName),
					existing + "\n" + content,
					"utf-8",
				);
				console.log(`  ✓ ${sdkFile} → ${localName} (appended)`);
			} else {
				writeFileSync(join(EXAMPLES_DIR, localName), content, "utf-8");
				written.add(localName);
				console.log(`  ✓ ${sdkFile} → ${localName}`);
			}
		}
	}
}

async function main() {
	const forceGithub =
		process.env.SYNC_FROM_GITHUB === "true" ||
		process.env.SYNC_FROM_GITHUB === "1";
	const localDir = forceGithub ? null : findLocalRepo();

	if (localDir) {
		console.log(`[sync-sdk-examples] Copying from local repo: ${localDir}`);
		const count = copyLocalFiles(localDir);
		console.log(`[sync-sdk-examples] Copied ${count} files.`);
		return;
	}

	if (forceGithub) {
		console.log(
			`[sync-sdk-examples] SYNC_FROM_GITHUB set, fetching from github.com/${REPO}@${BRANCH}...`,
		);
	} else {
		console.log(
			`[sync-sdk-examples] No local repo found, fetching from github.com/${REPO}@${BRANCH}...`,
		);
	}
	await fetchFromGithub();
	console.log("[sync-sdk-examples] Done.");
}

main().catch((err) => {
	console.error("[sync-sdk-examples] Error:", err);
	process.exit(1);
});
