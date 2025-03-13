import { ProductPage } from "@pages";

export default function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ProductPage id={id} />;
}
