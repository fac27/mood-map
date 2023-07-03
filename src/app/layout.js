import "./globals.css";
import { yesevaOne, josefinSans } from "../utils/fonts";

export const metadata = {};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={`${yesevaOne.className} ${josefinSans.className}`}>
          {children}
        </body>
      </html>
    </>
  );
}
