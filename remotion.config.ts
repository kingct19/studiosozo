import path from "path";
import { Config } from "@remotion/cli/config";

Config.setPort(3333);

Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    resolve: {
      ...currentConfiguration.resolve,
      alias: {
        ...(currentConfiguration.resolve?.alias ?? {}),
        "@": path.resolve(process.cwd()),
      },
    },
  };
});
