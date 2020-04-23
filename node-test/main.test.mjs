describe("@esm-bundle/angular__router", () => {
  it("can load the esm es2015 bundle without dying", () => {
    return import("../esm/es2015/angular-router.min.js");
  });

  it("can load the esm es5 bundle without dying", () => {
    return import("../esm/es5/angular-router.min.js");
  });
});
