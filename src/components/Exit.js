import Link from "next/link";
import styles from "./Exit.module.css";
export default function Exit({ path }) {
  return (
    <span className={styles.float}>
      <Link href={path} style={{ textDecoration: "none" }}>
        ❌
      </Link>
    </span>
  );
}
