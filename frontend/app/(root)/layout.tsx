import { headers } from "next/headers";
import { NextHeaders } from "@shared/consts";
import { CartFloatingBubble } from "@entities";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = headers().get(NextHeaders.XUserId);
  console.log("RootLayout - userId", userId);
  return (
    <>
      {children}
      <CartFloatingBubble userId={userId} />
    </>
  );
}
