import "./globals.css";
import { Yeseva_One, Josefin_Sans } from "next/font/google";

const yesevaOne = Yeseva_One({
  weight: "400",
  subsets: ["latin"],
});

export const josefinSans = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={yesevaOne.className}>{children}</body>
    </html>
  );
}
