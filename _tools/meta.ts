import { BuildOptions } from "https://deno.land/x/dnt@0.33.1/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["esnext", "dom"],
  },
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/http-log",
    version,
    description:
      "HTTP request and response log middleware and format utilities",
    keywords: [
      "http",
      "log",
      "logger",
      "handler",
      "middleware",
      "request",
      "response",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/http-log",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/http-log.git",
    },
    bugs: {
      url: "https://github.com/httpland/http-log/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
});
