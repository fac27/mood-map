import Image from "next/image";
import Link from "next/link";
import calendar from "../../public/images/calendar.png";
import home from "../../public/images/home.png";
import graph from "../../public/images/graph.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <Link href={"/life-in-colour"}>
        <Image src={calendar} alt="calendar" width={40} height={40} />
      </Link>
      <Link href={"/"}>
        <Image src={home} alt="home" width={40} height={40} />
      </Link>
      <Link href={"/analytics"}>
        <Image src={graph} alt="graph" width={40} height={40} />
      </Link>
    </nav>
  );
}
