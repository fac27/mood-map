import Link from "next/link";
import styles from "@/app/page.module.css";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <h1>Hello, Emily! 🤺</h1>
      <span className={styles.textFont}>
        <Link href="login">Login</Link>
      </span>
      <Navbar />
    </>
  );
}
