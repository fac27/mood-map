"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { josefinSans } from "@/utils/fonts";
import Exit from "@/components/Exit";
import emo1 from "../../../public/images/emo1.png";
import emo2 from "../../../public/images/emo2.png";
import emo3 from "../../../public/images/emo3.png";
import emo4 from "../../../public/images/emo4.png";
import styles from "./page.module.css";
import emo5 from "../../../public/images/emo5.png";

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
        {[emo1, emo2, emo3, emo4, emo5].map((svg, i) => (
          <button
            key={i}
            className={styles.hiddenButton}
            onClick={() => setEmotion(svg)}
          >
            <Image src={svg} alt="image" width={60} height={60} />
          </button>
        ))}
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
