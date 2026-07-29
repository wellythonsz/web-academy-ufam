import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
// 1. Importações do Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { Navbar } from "./components/Navbar";
import { BootstrapClient } from './components/BootstrapClient';
import { ReactQueryClientProvider } from './components/ReactQueryClient';

export const metadata: Metadata = {
  title: "WA Loja",
  description: "Loja Virtual do Web Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-br'>
      <body>
        <ReactQueryClientProvider>
          <Navbar />
          {children}
          <BootstrapClient />
          {/* 2. Container para os alertas aparecerem */}
          <ToastContainer position="top-right" autoClose={3000} />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}