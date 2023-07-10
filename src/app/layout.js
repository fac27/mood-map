import "./globals.css";
import { yesevaOne } from "../utils/fonts";
import Logout from "@/components/Logout";

export const metadata = {};

export default function RootLayout({ children }) {
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
