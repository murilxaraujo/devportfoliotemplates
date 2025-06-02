import type { NextConfig } from "next";

import { resolve } from 'path';
const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "pt-BR"],
    defaultLocale: "en",
    localeDetection: false,
  },
  // Alias for next-intl runtime config in webpack
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next-intl/config': resolve(__dirname, 'next-intl.config.cjs'),
    };
    return config;
  },
  // Alias for next-intl runtime config in Turbopack (dev mode)
  experimental: {
    turbo: {
      resolveAlias: {
        // Use a relative import specifier for Turbopack; absolute paths are not supported
        'next-intl/config': './next-intl.config.cjs',
      },
    },
  },
};

export default nextConfig;
