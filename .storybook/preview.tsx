import type { Preview } from "@storybook/nextjs-vite";
import "../styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/ja",
        query: {},
      },
    },
  },
};

export default preview;
