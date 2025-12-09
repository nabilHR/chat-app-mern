import { defineConfig } from "@chakra-ui/react";
import { createSystem, defaultConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    body: {
      color: "blue",
      bg: "blue",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
