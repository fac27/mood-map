"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Exit from "@/components/Exit";
import emo1 from "../../../public/images/emo1.svg";
import emo2 from "../../../public/images/emo2.svg";
import emo3 from "../../../public/images/emo3.svg";
import emo4 from "../../../public/images/emo4.svg";
import emo5 from "../../../public/images/emo5.svg";
import styles from "./page.module.css";
import DetailsModal from "@/components/DetailsModal";

export default function MoodPicker() {
  const [emotion, setEmotion] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Exit path={"/"} />
      <h1 className={styles.title}>How are you feeling?</h1>
      <span className={styles.center}>
        <Image
          src={`/images/emo${emotion}.svg`}
          alt="image"
          width={150}
          height={150}
        />
      </span>
      <div className={styles.flex}>
        {[emo1, emo2, emo3, emo4, emo5].map((svg, i) => (
          <button
            key={i}
            className={styles.hiddenButton}
            onClick={() => setEmotion(i + 1)}
          >
            <Image src={svg} alt="image" width={60} height={60} />
          </button>
        ))}
      </div>
      <button onClick={() => setShowDetails(true)}>Give more detail?</button>
      <Link href="/">
        <button>Add mood</button>
      </Link>

      {showDetails && <DetailsModal emotion={emotion} />}
    </>
  );
}
