import { createMDX } from "fumadocs-mdx/next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const withMDX = createMDX();
const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	async redirects() {
		return [
			{ source: "/impressum", destination: "/imprint", permanent: true },
		];
	},
	turbopack: {
		root: projectRoot,
	},
	experimental: {
		optimizePackageImports: ["lucide-react", "fumadocs-ui", "react-icons"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "pbs.twimg.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "i.pravatar.cc",
			},
		],
	},
	skipTrailingSlashRedirect: true,
};

export default withMDX(config);
