import "./globals.css";
import { yesevaOne } from "../utils/fonts";
import Logout from "@/components/Logout";
import { ReactNode } from "react";

export const metadata: Record<string, any> = {};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en">
        <body className={yesevaOne.className}>
          <Logout />
          {children}
        </body>
      </html>
    </>
  );
}
