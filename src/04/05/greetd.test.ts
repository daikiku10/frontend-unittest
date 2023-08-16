import { greet } from "./greet";

test('モック関数は実行された', () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toBeCalled();
})

test('モック関数は実行されてない', () => {
  const mockFn = jest.fn();
  expect(mockFn).not.toBeCalled();
})

test('モック関数は実行された回数を記録している', () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(1);
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(2);
})

test('モック関数は関数の中でも実行できる', () => {
  const mockFn = jest.fn();
  // モック関数を関数定義の中に忍ばせる
  function greet() {
    mockFn();
  }
  greet();
  expect(mockFn).toHaveBeenCalledTimes(1);
})

test('モック関数は実行時の引数を記録している', () => {
  const mockFn = jest.fn();
  function greet(message: string) {
    mockFn(message); // 引数を持って実行される
  }
  greet("arola");
  expect(mockFn).toHaveBeenCalledWith("arola");
})