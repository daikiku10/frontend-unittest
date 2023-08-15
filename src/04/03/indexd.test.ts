import { getGreet } from ".";
import * as Fetchers from "../fetchers";
import { httpError } from "../fetchers/fixtures";

jest.mock("../fetchers");

test("データ取得成功時：ユーザー名がない場合", async () => {
  // getMyProfileがresolveしたときの値を再現する
  // jest.spyOn(対象のオブジェクト, 対象の関数名称)
  jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
    id: "testId",
    email: "test@test.test.com",
  });
  await expect(getGreet()).resolves.toBe("Hello, anonymous user!");
})

test("データ取得成功時：ユーザー名がある場合", async () => {
  // getMyProfileがresolveしたときの値を再現する
  jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
    id: "testId",
    email: "test@test.test.com",
    name: "dai",
  });
  await expect(getGreet()).resolves.toBe("Hello, dai!");
})

test("データ取得失敗時", async () => {
  // getMyProfileがrejectしたときの値を再現する
  jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
  await expect(getGreet()).rejects.toMatchObject({
    err: { message: "internal server error" }
  });
})

test("データ取得失敗時：エラー相当のデータが例外としてスローされる", async () => {
  // アサーションが1回呼ばれるようにする。
  expect.assertions(1)

  // getMyProfileがrejectしたときの値を再現する
  jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
  
  // 以下の文で37行目がないとこのテストは成功してしまう。アサーションを確認してなくても。
  // jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
  //   id: "testId",
  //   email: "test@test.test.com",
  //   name: "dai",
  // });

  try {
    await getGreet();
  } catch (err) {
    expect(err).toMatchObject(httpError);
  }
})