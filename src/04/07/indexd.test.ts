import { greetByTime } from ".";

describe('greetByTime()', () => {
  // 以下テストの共通のセットアップ
  beforeEach(() => {
    jest.useFakeTimers();
  });
  // テスト終了後の共通の破棄作業
  afterEach(() => {
    jest.useRealTimers();
  });

  test('指定時間待つと、経過時間をもってresolveされる', () => {
    jest.setSystemTime(new Date(2022, 7, 20, 8, 0, 0));
    expect(greetByTime()).toBe('おはよう');
  });

  test('指定時間待つと、経過時間をもってresolveされる', () => {
    jest.setSystemTime(new Date(2022, 7, 20, 14, 0, 0));
    expect(greetByTime()).toBe('こんにちは');
  });

  test('指定時間待つと、経過時間をもってresolveされる', () => {
    jest.setSystemTime(new Date(2022, 7, 20, 19, 0, 0));
    expect(greetByTime()).toBe('こんばんは');
  });
});