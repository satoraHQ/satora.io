import { legal } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";

export const legalSource = loader({
  baseUrl: "/",
  source: toFumadocsSource(legal, []),
});
