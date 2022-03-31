document.head.appendChild(
  Object.assign(document.createElement("script"), {
    type: "systemjs-importmap",
    textContent: `
      {
        "imports": {
          "rxjs": "https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/es2015/rxjs.min.js",
          "rxjs/operators": "https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/es2015/rxjs-operators.min.js",
          "@angular/core": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__core/system/es2015/ivy/angular-core.min.js",
          "@angular/common": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__common/system/es2015/ivy/angular-common.min.js",
          "@angular/platform-browser": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__platform-browser/system/es2015/ivy/angular-platform-browser.min.js",
          "@angular/upgrade/static": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__upgrade/system/es2015/ivy/angular-static.min.js",
          "@angular/router": "/base/system/es2015/ivy/angular-router.min.js"
        }
      }`,
  })
);
