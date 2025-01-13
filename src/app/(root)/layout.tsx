import type { Metadata } from "next";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Gritraining",
  description: "Gritraining",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
