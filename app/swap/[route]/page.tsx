import SwapRoutePage, { swapRouteMetadata } from "@/components/sections/SwapRoutePage";
import { findSwapRoute, swapRoutes } from "@/config/swap-routes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ route: string }>;

// Every landing page is pre-rendered; a slug outside the config is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return swapRoutes.map((route) => ({ route: route.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const route = findSwapRoute((await params).route);
  if (!route) return {};
  return swapRouteMetadata(route.title, route.description, `/swap/${route.slug}`);
}

export default async function Page({ params }: { params: Params }) {
  const route = findSwapRoute((await params).route);
  if (!route) notFound();
  return <SwapRoutePage route={route} />;
}
