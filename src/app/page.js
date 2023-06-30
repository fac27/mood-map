import Link from "next/link";
import { josefinSans } from "@/utils/fonts";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <>
      <h1>Hello Moodsters!</h1>
      <span className={josefinSans.className}>
        <Link href="login">Login</Link>
      </span>
      <Navbar />
    </>
  );
}
