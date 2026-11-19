// SPDX-License-Identifier: AGPL-3.0-only
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    cloudflareTest({
      main: "./test/history-worker.ts",
      wrangler: { configPath: "./wrangler.jsonc" },
      miniflare: {
        workers: [{
          name: "irisbeat-deploy-delivery",
          modules: true,
          compatibilityDate: "2026-11-18",
          script: "import { WorkerEntrypoint } from 'cloudflare:workers'; export class NotificationEmailCapability extends WorkerEntrypoint { isConfigured() { return false; } }",
        }],
        bindings: { INSTALLATION_SECRET: "test-installation-secret", STATUS_RENDER_INTERVAL_SECONDS: "0" },
      },
    }),
  ],
});
