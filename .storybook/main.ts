import type { StorybookConfig } from "@storybook/react-vite";
const viteTsconfig = require("vite-tsconfig-paths");
const tsconfigPaths = viteTsconfig.default;

const { mergeConfig } = require("vite");

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
  ],
  previewHead: (head) => `
    ${head}
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
      html, body {
        font-family: "Orbitron", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-smooth: never;
      }
    </style>
  `,
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    // process.env = { ...process.env, ...loadEnv(config.mode, process.cwd()) };
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};
export default config;
