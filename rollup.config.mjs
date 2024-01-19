import fs from "fs";
import url from "url";
import path from "path";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import { createEs2015LinkerPlugin } from "@angular/compiler-cli/linker/babel";
import {
  ConsoleLogger,
  NodeJSFileSystem,
  LogLevel,
} from "@angular/compiler-cli";

const __dirname = new url.URL(".", import.meta.url).pathname;
const packageJson = JSON.parse(
  fs
    .readFileSync(
      path.resolve(__dirname, "node_modules/@angular/router/package.json"),
    )
    .toString(),
);

/** File system used by the Angular linker plugin. */
const fileSystem = new NodeJSFileSystem();
/** Logger used by the Angular linker plugin. */
const logger = new ConsoleLogger(LogLevel.info);
/**
 * The linker plugin is used to make output files AOT compatible, so they don't
 * require the `@angular/compiler` at runtime.
 */
const linkerPlugin = createEs2015LinkerPlugin({
  fileSystem,
  logger,
  linkerJitMode: false,
});

const packages = ["2022"]
  .map((ecma) => [
    {
      ecma,
      angularPackage: "@angular/router",
      filename: "router",
    },
    {
      ecma,
      angularPackage: "@angular/router/upgrade",
      filename: "upgrade",
    },
  ])
  .flat();

export default packages
  .map(({ ecma, angularPackage, filename }) => [
    createConfig({
      ecma,
      prod: false,
      format: "system",
      angularPackage,
      filename,
    }),
    createConfig({
      ecma,
      prod: true,
      format: "system",
      angularPackage,
      filename,
    }),
    createConfig({ ecma, prod: false, format: "es", angularPackage, filename }),
    createConfig({ ecma, prod: true, format: "es", angularPackage, filename }),
  ])
  .flat();

function terserConfig(ecma, devMode) {
  return terser({
    format: {
      ecma,
      comments: /esm-bundle/,
    },
    compress: {
      global_defs: {
        ngJitMode: false,
        ngDevMode: devMode,
        ngI18nClosureMode: false,
      },
    },
  });
}

function createConfig({ ecma, prod, format, angularPackage, filename }) {
  const dir = (format === "es" ? "." : format) + `/es${ecma}/ivy`;

  return {
    input: path.join(
      __dirname,
      `node_modules/@angular/router/fesm${ecma}/${filename}.mjs`,
    ),
    output: {
      file: `${dir}/angular-${filename}.${prod ? "min." : ""}js`,
      format,
      sourcemap: true,
      banner: `/* esm-bundle - ${angularPackage}@${packageJson.version} - Ivy - ${format} format - es${ecma} - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */`,
    },
    plugins: [
      babel({ plugins: [linkerPlugin] }),
      prod
        ? prod && terserConfig(ecma, false)
        : !prod && terserConfig(ecma, true),
    ],
    external: [
      "rxjs",
      "rxjs/operators",
      "@angular/core",
      "@angular/common",
      "@angular/platform-browser",
      "@angular/router",
      "@angular/upgrade/static",
    ],
  };
}
