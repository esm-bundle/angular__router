import { terser } from "rollup-plugin-terser";
import packageJson from "@angular/router/package.json";

export default [
  createConfig({ prod: false, format: "system" }),
  createConfig({ prod: true, format: "system" }),
  createConfig({ prod: false, format: "es" }),
  createConfig({ prod: true, format: "es" }),
];

function createConfig({ prod, format }) {
  const dir = (format === "es" ? "." : format) + "/es2015/ivy";

  return {
    input: require.resolve("@angular/router/fesm2015/router.js"),
    output: {
      file: `${dir}/angular-router.${prod ? "min." : ""}js`,
      format,
      sourcemap: true,
      banner: `/* esm-bundle - @angular/router@${packageJson.version} - Ivy - ${format} format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */`,
    },
    plugins: [
      prod &&
        terser({
          format: {
            comments: /esm-bundle/,
            ecma: "2015",
          },
        }),
    ],
    external: [
      "rxjs",
      "rxjs/operators",
      "@angular/core",
      "@angular/common",
      "@angular/platform-browser",
    ],
  };
}
