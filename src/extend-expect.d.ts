// tslint:disable:no-namespace
declare namespace jest {
  interface Matchers<R> {
    toHaveStyleRule: import('node_modules/jest-styled-components/typings/index.d.ts').jest.Matchers['toHaveStyleRule']
    // toHaveStyleRule: import("jest-styled-components").jest.Matchers<R>["toHaveStyleRule"]
  }

  // interface Matchers<R> {
  //   toHaveStyleRule(property: string, value?: Value, options?: Options): R;
  // }
}
