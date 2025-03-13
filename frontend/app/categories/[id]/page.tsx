import { CategoryPage } from "@pages";

export default function Category({
  params: { id },
}: {
  params: { id: string };
}) {
  return <CategoryPage id={id} />;
}
