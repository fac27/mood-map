import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Yeseva_One, Josefin_Sans } from "next/font/google";

export const yesevaOne = Yeseva_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-header",
}) as NextFontWithVariable;

export const josefinSans = Josefin_Sans({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-content",
}) as NextFontWithVariable;
