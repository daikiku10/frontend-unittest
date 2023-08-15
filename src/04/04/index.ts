import { getMyArticles } from "../fetchers";

// ここでのテストは以下の3つ
// ①指定したタグを持つ記事が1件もない場合、nullが返る
// ②指定したタグを持つ記事が1件以上ある場合、リンク一覧が返る
// ③データ取得に失敗した場合、例外がスローされる
export async function getMyArticleLinksByCategory(category: string) {
  // データを取得する関数
  const data = await getMyArticles();
  // 取得したデータのうち、指定したタグが含まれる記事に絞り込む
  const articles = data.articles.filter((article) =>
    article.tags.includes(category)
  );
  if (!articles.length) {
    // 該当記事がない場合、null を返す
    return null;
  }
  // 該当記事がある場合、一覧向けに加工したデータを返す
  return articles.map((article) => ({
    title: article.title,
    link: `/articles/${article.id}`,
  }));
}
