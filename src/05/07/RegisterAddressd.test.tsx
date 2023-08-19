import { render, screen } from "@testing-library/react";
import { mockPostMyAddress } from "./fetchers/mock";
import { RegisterAddress } from "./RegisterAddress";
import {
  clickSubmit,
  inputContactNumber,
  inputDeliveryAddress,
} from "./testingUtils";

// モックモジュールを実施するテストでは忘れない！
jest.mock("./fetchers");

/** 「全ての入力欄に入力し、送信するまで」を1つの非同期関数 */
async function fillValuesAndSubmit() {
  const contactNumber = await inputContactNumber();
  const deliveryAddress = await inputDeliveryAddress();
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit();
  return submitValues;
}

/** バリデーションエラー分岐を通過する操作関数 */
async function fillInvalidValuesAndSubmit() {
  const contactNumber = await inputContactNumber({
    name: "test テスト",
    phoneNumber: "abc-defg-hijk",
    });
  const deliveryAddress = await inputDeliveryAddress();
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit();
  return submitValues;

}

test("成功時「登録しました」が表示される", async () => {
  const mockFn = mockPostMyAddress();

  render(<RegisterAddress />);

  const submitValues = await fillValuesAndSubmit();

  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  expect(screen.getByText("登録しました")).toBeInTheDocument();
});

test("失敗時「登録に失敗しました」が表示される", async () => {
  const mockFn = mockPostMyAddress(500);

  render(<RegisterAddress />);

  const submitValues = await fillValuesAndSubmit();

  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  expect(screen.getByText("登録に失敗しました")).toBeInTheDocument();
});

test("バリデーションエラー時、メッセージが表示される", async () => {
  render(<RegisterAddress />);
  await fillInvalidValuesAndSubmit();
  expect(screen.getByText("不正な入力値が含まれています")).toBeInTheDocument();
});

test("不明なエラー時、メッセージが表示される", async () => {
  // モック関数が実行されていないテストでは、Web APIのリクエストを処理できない
  // そのため、不明なエラーの発生状況を再現できる
  render(<RegisterAddress />);
  await fillValuesAndSubmit();
  expect(screen.getByText("不明なエラーが発生しました")).toBeInTheDocument();
});

test("Snapshot: 登録フォームが表示される", async () => {
  // mockPostMyAddress();
  const mockFn = mockPostMyAddress();

  const { container } = render(<RegisterAddress />);
  const submitValues = await fillValuesAndSubmit();

  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  // expect(screen.getByText("登録しました")).toBeInTheDocument();


  expect(container).toMatchSnapshot();
});
