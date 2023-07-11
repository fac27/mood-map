import "./globals.css";
import { yesevaOne } from "../utils/fonts";
import Logout from "@/components/Logout";
import { ReactNode } from "react";
import { getSessionServer } from "@/lib/server/session";
export const metadata: Record<string, any> = {};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getSessionServer();

  return (
    <>
      <html lang="en">
        <body className={yesevaOne.className}>
          {session ? <Logout /> : ""}
          {children}
        </body>
      </html>
    </>
  );
}
