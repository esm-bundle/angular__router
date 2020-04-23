import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

function createConfig({
  format,
  target,
  minify,
  resolvedAngularCore,
  resolvedAngularCommon,
  resolvedRxjs,
}) {
  let dir = format === "module" ? "esm" : format;
  dir += `/${target}`;

  return {
    input: `./src/${target}/angular-router.js`,
    output: {
      file: `${dir}/angular-router${resolvedAngularCore ? ".resolved" : ""}${
        minify ? ".min" : ""
      }.js`,
      sourcemap: true,
      format,
      banner: `/* @angular/router@${packageJson.version} */`,
      paths: {
        "@angular/core": resolvedAngularCore
          ? `https://cdn.jsdelivr.net/npm/@esm-bundle/angular__core@${resolvedAngularCore}/esm/${target}/angular-core.resolved${
              minify ? ".min" : ""
            }.js`
          : "@angular/core",
        "@angular/common": resolvedAngularCommon
          ? `https://cdn.jsdelivr.net/npm/@esm-bundle/angular__common@${resolvedAngularCommon}/esm/${target}/angular-common.resolved${
              minify ? ".min" : ""
            }.js`
          : "@angular/common",
        rxjs: resolvedRxjs
          ? `https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs@${resolvedRxjs}/esm/${target}/rxjs.min.js`
          : "rxjs",
        "rxjs/operators": resolvedRxjs
          ? `https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs@${resolvedRxjs}/esm/${target}/rxjs-operators.min.js`
          : "rxjs/operators",
      },
    },
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      minify &&
        terser({
          output: {
            comments: /@angular\/router@/,
          },
        }),
    ],
    external: ["@angular/core", "@angular/common"],
  };
}

export default () => {
  const angularCoreDep = packageJson.devDependencies["@angular/core"];
  const resolvedAngularCore = angularCoreDep.slice(
    angularCoreDep.lastIndexOf("@") + 1
  );

  const angularCommonDep = packageJson.devDependencies["@angular/common"];
  const resolvedAngularCommon = angularCommonDep.slice(
    angularCommonDep.lastIndexOf("@") + 1
  );

  const rxjsDep = packageJson.devDependencies["rxjs"];
  const resolvedRxjs = rxjsDep.slice(rxjsDep.lastIndexOf("@") + 1);

  return [
    createConfig({
      format: "module",
      target: "es5",
      minify: true,
      resolvedAngularCore,
      resolvedAngularCommon,
      resolvedRxjs,
    }),
    createConfig({
      format: "module",
      target: "es5",
      minify: false,
      resolvedAngularCore,
      resolvedAngularCommon,
      resolvedRxjs,
    }),
    createConfig({
      format: "module",
      target: "es5",
      minify: true,
    }),
    createConfig({
      format: "module",
      target: "es5",
      minify: false,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: true,
      resolvedAngularCore,
      resolvedAngularCommon,
      resolvedRxjs,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: false,
      resolvedAngularCore,
      resolvedAngularCommon,
      resolvedRxjs,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: true,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: false,
    }),
    createConfig({ format: "system", target: "es5", minify: true }),
    createConfig({ format: "system", target: "es5", minify: false }),
    createConfig({ format: "system", target: "es2015", minify: true }),
    createConfig({ format: "system", target: "es2015", minify: false }),
  ];
};
