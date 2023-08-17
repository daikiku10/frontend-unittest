import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "./Form";

test("名前の表示", () => {
  render(<Form name="taro" />);
  // console.log(screen.getByText("taro"));
  expect(screen.getByText("taro")).toBeInTheDocument();
});

test("ボタンの表示", () => {
  render(<Form name="taro" />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("見出しの表示", () => {
  render(<Form name="taro" />);
  // console.log(screen.getByRole("heading"));
  expect(screen.getByRole("heading")).toHaveTextContent("アカウント情報");
});

test("ボタンを押下すると、イベントハンドラーが実行される", () => {
  const mockFn = jest.fn();
  render(<Form name="taro" onSubmit={mockFn} />);
  fireEvent.click(screen.getByRole("button"));
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toBeCalled();
});