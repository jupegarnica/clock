// @ts-check
// import { defineConfig } from "astro/config";

// import react from "@astrojs/react";
// import node from "@astrojs/node";

// // https://astro.build/config
// export default defineConfig({
//   integrations: [react()],

//   adapter: node({
//     mode: "standalone",
//   }),
// });

import { defineConfig } from "astro/config";
import deno from "@deno/astro-adapter";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  // output: "server",
  output: 'static',
  adapter: deno(),
});
