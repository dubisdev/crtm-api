#!/usr/bin/env bun

import { build } from "bun";
import { rmSync } from "fs";

// Clean dist directory
rmSync("./dist", { recursive: true, force: true });

console.log("🔨 Building ESM package...");

// Build ESM
await build({
    entrypoints: [
        "./src/index.ts",
        "./src/stops/index.ts",
        "./src/lines/index.ts",
        "./src/stop-times/index.ts",
        "./src/shared/errors/index.ts",
    ],
    outdir: "./dist",
    target: "browser",
    format: "esm",
    splitting: true,
    minify: false,
    sourcemap: "external",
});

console.log("✅ Build complete!");
console.log("📦 Generating TypeScript declarations...");

// Generate type declarations
await Bun.$`bunx tsc --emitDeclarationOnly`;

console.log("✅ ESM package ready for publishing!");
