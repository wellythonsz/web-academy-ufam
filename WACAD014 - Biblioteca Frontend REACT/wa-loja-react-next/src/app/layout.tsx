import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./components/Navbar";

export const metadata: Metadata = {
  title: "WA Loja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-light">
        <Navbar />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}