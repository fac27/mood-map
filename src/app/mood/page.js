"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Exit from "@/components/Exit";
import emo1 from "../../public/images/emo1.svg";
import emo2 from "../../public/images/emo2.svg";
import emo3 from "../../public/images/emo3.svg";
import emo4 from "../../public/images/emo4.svg";
import emo5 from "../../public/images/emo5.svg";
import styles from "./page.module.css";

export default function MoodPicker() {
  const [emotion, setEmotion] = useState(emo4);

  const emojiElements = [emo1, emo2, emo3, emo4, emo5].map((svg, i) => (
    <Image
      key={i}
      className={styles.emojiBox}
      onClick={() => setEmotion(svg)}
      src={svg}
      alt="image"
      width={60}
      height={60}
    />
  ));

  return (
    <>
      <div className={styles.header}>
        <Exit path={"/"} />
        <h1 className={styles.title}>How are you feeling today?</h1>
        <Image
          className={styles.selectedImage}
          src={emotion}
          alt="defualt emotion"
        />
      </div>

      <div className={styles.emojiContainer}>{emojiElements}</div>

      <div className={styles.links}>
        <Link href="/detail">
          <button>Give more detail?</button>
        </Link>
        <Link href="/">
          <button className={styles.activeButton}>Add mood</button>
        </Link>
      </div>
    </>
  );
}
