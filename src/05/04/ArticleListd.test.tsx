import { render, screen, within } from "@testing-library/react";
import { ArticleList } from "./ArticleList";
import { items } from "./fixture";

test("itemsの数だけ一覧表示される", () => {
  render(<ArticleList items={items} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("一覧が表示される", () => {
  render(<ArticleList items={items} />);
  const list = screen.getByRole("list");
  expect(list).toBeInTheDocument();
});

test("itemsの数だけ一覧表示される", () => {
  render(<ArticleList  items={items}/>);
  const list = screen.getByRole("list");
  expect(list).toBeInTheDocument();
  expect(within(list).getAllByRole("listitem")).toHaveLength(3);
});

test("一覧アイテムが空の時、「投稿記事がありません」が表示される", () => {
  // 空配列を与えて、一覧表示がない状態を再現する
  render(<ArticleList items={[]} />);
  // 存在しないと予想される要素の取得を試みる
  const list = screen.queryByRole("list");
  // listは存在しない：パターン①
  expect(list).not.toBeInTheDocument();
  // listはnullである：パターン②
  expect(list).toBeNull();
  // 「投稿記事がありません」が表示されていることを確認
  expect(screen.getByText("投稿記事がありません")).toBeInTheDocument();
});


