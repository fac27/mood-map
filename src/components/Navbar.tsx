"use client"

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  return (
    <nav className={styles.container}>
      <Link href={"/mood"}>
        <Image
          src={`/images/Smiley.svg`}
          alt="smiley face"
          width={40}
          height={40}
        />
      </Link>

      <Link href={"/"}>
        <Image src={`/images/home.svg`} alt="home" width={40} height={40} />
      </Link>
      <Link href={"/life-in-colour"}>
        <Image
          src={`/images/calendar.svg`}
          alt="calendar"
          width={40}
          height={40}
        />
      </Link>
    </nav>
  );
};

export default Navbar;
