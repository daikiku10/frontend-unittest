import { getMyArticleLinksByCategory } from ".";
import * as Fetchers from "../fetchers";
import { getMyArticlesData, httpError } from "../fetchers/fixtures";

jest.mock("../fetchers");

function mockGetMyArticles(status = 200) {
  if (status > 299) {
    return jest
      .spyOn(Fetchers, "getMyArticles")
      .mockRejectedValueOnce(httpError);
  }

  return jest
    .spyOn(Fetchers, "getMyArticles")
    .mockResolvedValueOnce(getMyArticlesData);
}

// test("データ取得に成功した場合", async () => {
//   mockGetMyArticles();
// })

// test("データ取得に失敗した場合", async () => {
//   mockGetMyArticles(500);
// })

test("指定したタグを持つ記事が1件もない場合、nullが返る", async () => {
  mockGetMyArticles();

  const data = await getMyArticleLinksByCategory("playwright");
  expect(data).toBeNull();
})

test("指定したタグを持つ記事が1件以上ある場合、リンク一覧が返る", async () => {
  mockGetMyArticles();

  const data = await getMyArticleLinksByCategory("testing");
  expect(data).toMatchObject([
    {
      title: "TypeScript を使ったテストの書き方",
      link: "/articles/howto-testing-with-typescript",
    },
    {
      title: "Jest ではじめる React のコンポーネントテスト",
      link: "/articles/react-component-testing-with-jest",
    },
  ])
})

test("データ取得に失敗した場合、例外がスローされる", async () => {
  mockGetMyArticles(500);

  await getMyArticleLinksByCategory("testing").catch((err) => {
    expect(err).toMatchObject({
      err: { message: 'internal server error' }
    })
  })
})
