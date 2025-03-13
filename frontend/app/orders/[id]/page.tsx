import { OrderPage } from "@pages";

export default function Order({ params: { id } }: { params: { id: string } }) {
  return <OrderPage id={id} />;
}
