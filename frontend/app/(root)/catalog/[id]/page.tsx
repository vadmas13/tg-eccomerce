import { CatalogProductPage } from "@pages";

export default function ProductCard({
  params: { id },
}: {
  params: { id: string };
}) {
  return <CatalogProductPage id={id} />;
}
