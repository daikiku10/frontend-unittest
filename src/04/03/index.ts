import { getMyProfile } from "../fetchers";

export async function getGreet() {
  // テストしたいのはここのデータ取得と
  // ③データ取得失敗した場合の確認
  // ④例外をスローした場合の確認
  const data = await getMyProfile();
  // 取得したデータをここで連結する処理
  if (!data.name) {
    // ①名前がなければ、定型文を返す
    return `Hello, anonymous user!`;
  }
  // ②名前を含んだ挨拶を返す
  return `Hello, ${data.name}!`;
}
