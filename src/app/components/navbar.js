import Image from "next/image";
import Link from "next/link";
import calendar from "../../images/calendar.png";
import home from "../../images/home.png";
import graph from "../../images/graph.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <Link href={"/"}>
        <Image src={calendar} alt="graph" width={40} height={40} />
      </Link>
      <Link href={"/"}>
        <Image src={home} alt="graph" width={40} height={40} />
      </Link>
      <Link href={"/"}>
        <Image src={graph} alt="graph" width={40} height={40} />
      </Link>
    </nav>
  );
}
