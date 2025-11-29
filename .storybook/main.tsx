import type { StorybookConfig } from "@storybook/nextjs-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  async viteFinal(config) {
    // Viteの設定を拡張してnext/navigationをモック
    const mockPath = path.resolve(
      process.cwd(),
      ".storybook/__mocks__/next-navigation.ts"
    );
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "next/navigation": mockPath,
      };
    } else {
      config.resolve = {
        alias: {
          "next/navigation": mockPath,
        },
      };
    }
    return config;
  },
};

export default config;
