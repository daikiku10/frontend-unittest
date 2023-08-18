import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputAccount } from "./InputAccount";

// テストファイルではじめにセットアップする
const user = userEvent.setup();

test("メールアドレス入力欄", async () => {
  render(<InputAccount />);
  // メールアドレス入力欄の取得
  const textbox = screen.getByRole("textbox", { name: "メールアドレス" });
  const value = "taro.test@example.com";
  // textboxにvalueを入力する
  await user.type(textbox, value);
  // 期待値が入力されている、フォーム構成要素が存在するかを検証
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test("パスワード入力欄", async () => {
  render(<InputAccount />);
  // パスワード入力欄の取得
  // 例外をスローするかのテスト
  expect(() => screen.getByRole("textbox", { name: "パスワード" })).toThrow();
  expect(() => screen.getByPlaceholderText("8文字以上で入力")).not.toThrow();

  const password = screen.getByPlaceholderText("8文字以上で入力");
  const value = "test1234";
  await user.type(password, value);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});