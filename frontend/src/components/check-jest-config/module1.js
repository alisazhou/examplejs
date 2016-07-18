import someFunc from './module2.js';

const stupidFunc = () => {someFunc(); return 123;};
export default stupidFunc;
export { someFunc };
