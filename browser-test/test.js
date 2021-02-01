describe("@esm-bundle/angular__router", () => {
  it("can load the System.register es2015 ivy dev bundle", () => {
    return System.import("/base/system/es2015/ivy/angular-router.js");
  });

  it("can load the System.register es2015 ivy prod bundle", () => {
    return System.import("/base/system/es2015/ivy/angular-router.min.js");
  });
});
