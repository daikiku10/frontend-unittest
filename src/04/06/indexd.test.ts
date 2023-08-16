import { checkLength } from ".";
import * as Fetchers from "../fetchers";
import { postMyArticle } from "../fetchers";
import { httpError, postMyArticleData } from "../fetchers/fixtures";
import { ArticleInput } from "../fetchers/type";

jest.mock("../fetchers");

// モック生成関数
function mockPostMyArticle(input: ArticleInput, status = 200) {
  if (status > 299) {
    return jest
      .spyOn(Fetchers, "postMyArticle")
      .mockRejectedValueOnce(httpError);
  }

  try {
    checkLength(input.title);
    checkLength(input.body);
    return jest
      .spyOn(Fetchers, "postMyArticle")
      .mockResolvedValue({ ...postMyArticleData, ...input });
  } catch (err) {
    return jest
      .spyOn(Fetchers, "postMyArticle")
      .mockRejectedValueOnce(httpError);
  }
}

// 送信する値を動的に作成するためのファクトリー関数
function inputFactory(input?: Partial<ArticleInput>): ArticleInput {
  return {
    // デフォルトではバリデーションに通過する入力内容が作成され、
    // 必要に応じて引数を上書きする。
    tags: ["testing"],
    title: "Jest ではじめる React のコンポーネントテスト",
    body: "Jest は単体テストとして、UIコンポーネントのテストが可能です。",
    ...input,
  }
}

test("バリデーションに成功した場合、成功レスポンスが返る", async () => {
  // バリデーションに通過する入力値を用意
  const input = inputFactory();
  // 入力値を含んだ成功レスポンスが返るよう、モックを施す
  const mock = mockPostMyArticle(input);
  // テスト対象の関数に、inputを与えて実行
  const data = await postMyArticle(input);
  // 取得したデータに、入力内容が含まれているかを検証
  expect(data).toMatchObject(expect.objectContaining(input));
  // モック関数が呼び出されたかを検証
  expect(mock).toHaveBeenCalled();
});

test("バリデーションに失敗した場合、rejectされる", async () => {
  expect.assertions(2);
  // バリデーションに通過しない入力値を用意する
  const input = inputFactory({ title: "", body: "" });
  // 入力値を含んだ成功レスポンスが返るように、モックを施す
  const mock = mockPostMyArticle(input);
  // バリデーションに通過せずにrejectされるかを検証
  await postMyArticle(input).catch((err) => {
    // エラーオブジェクトを持ってrejectされることを検証
    expect(err).toMatchObject({ err: { message: expect.anything() } });
    // モック関数が呼び出されたことを検証
    expect(mock).toHaveBeenCalled();
  })
});