"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import emo1 from "../../images/emo1.png";
import emo2 from "../../images/emo2.png";
import emo3 from "../../images/emo3.png";
import emo4 from "../../images/emo4.png";
import emo5 from "../../images/emo5.png";
import styles from "./page.module.css";
import Exit from "../components/Exit";
import { josefinSans } from "@/utils/fonts";

export default function MoodPicker() {
  const [emotion, setEmotion] = useState(emo1);
  //   console.log(emotion);
  return (
    <>
      <Exit path={"/"} />
      <h1 className={`${josefinSans.className} ${styles.title}`}>
        How are you feeling?
      </h1>
      <span className={styles.center}>
        <Image src={emotion} alt="image" width={150} height={150} />
      </span>
      <div className={styles.flex}>
        <button
          className={styles.hiddenButton}
          onClick={() => setEmotion(emo1)}
        >
          <Image src={emo1} alt="image" width={60} height={60} />
        </button>
        <button
          className={styles.hiddenButton}
          onClick={() => setEmotion(emo2)}
        >
          <Image src={emo2} alt="image" width={60} height={60} />
        </button>
        <button
          className={styles.hiddenButton}
          onClick={() => setEmotion(emo3)}
        >
          <Image src={emo3} alt="image" width={60} height={60} />
        </button>
        <button
          className={styles.hiddenButton}
          onClick={() => setEmotion(emo4)}
        >
          <Image src={emo4} alt="image" width={60} height={60} />
        </button>
        <button
          className={styles.hiddenButton}
          onClick={() => setEmotion(emo5)}
        >
          <Image src={emo5} alt="image" width={60} height={60} />
        </button>
      </div>
      <Link href="/">
        <button>Give more detail?</button>
      </Link>
      <Link href="/">
        <button>Add mood</button>
      </Link>
    </>
  );
}
