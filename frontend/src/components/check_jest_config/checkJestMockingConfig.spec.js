/*eslint-env jest,jasmine */


// because package.json config to jest test runner can randomly break it
// eg: if you take out all the unmockedModulePathPatterns, it suddenly doesn't mock

import defaultImport, {someFunc} from './module1.js';
jest.unmock('./module2.js');
import module2Import from './module2.js';
describe('Whatever', () => {
  it('automocks correctly', () => {
    expect(someFunc.mock).toBeDefined();
    expect(defaultImport.mock).toBeDefined();
  });
  it('unmocks correctly', () => {
    expect(module2Import.mock).toBeUndefined();
  });
});
