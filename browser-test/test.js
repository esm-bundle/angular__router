describe("@esm-bundle/angular__router", () => {
  describe("@angular/router", () => {
    ["es2022"].forEach((ecma) => {
      it(`can load the System.register ${ecma} bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-router.js`,
        );
        expect(m.Router).toBeDefined();
      });

      it(`can load the System.register ${ecma} prod bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-router.min.js`,
        );
        expect(m.Router).toBeDefined();
      });
    });
  });

  describe("@angular/router/upgrade", () => {
    ["es2022"].forEach((ecma) => {
      it(`can load the System.register ${ecma} bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-upgrade.js`,
        );
        expect(m.RouterUpgradeInitializer).toBeDefined();
      });

      it(`can load the System.register ${ecma} prod bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-upgrade.min.js`,
        );
        expect(m.RouterUpgradeInitializer).toBeDefined();
      });
    });
  });
});
