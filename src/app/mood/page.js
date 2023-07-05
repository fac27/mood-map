"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Exit from "@/components/Exit";
// import emo1 from "../../../public/images/emo1.svg";
// import emo2 from "../../../public/images/emo2.svg";
// import emo3 from "../../../public/images/emo3.svg";
// import emo4 from "../../../public/images/emo4.svg";
// import emo5 from "../../../public/images/emo5.svg";
import styles from "./page.module.css";
import DetailsModal from "@/components/DetailsModal";

export default function MoodPicker() {
  const [emotion, setEmotion] = useState(4);
  const [showDetails, setShowDetails] = useState(false);

  const EmojiElements = [1, 2, 3, 4, 5].map((emotion) => (
    <Image
      key={emotion}
      className={styles.emojiBox}
      onClick={() => setEmotion(emotion + 1)}
      src={`/images/emo${emotion}.svg`}
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
          src={`/images/emo${emotion}.svg`}
          alt="defualt emotion"
        />
      </div>

      <div className={styles.emojiContainer}>
        <EmojiElements />
      </div>

      <div className={styles.links}>
        <button onClick={() => setShowDetails(true)}>Give more detail?</button>
        <Link href="/">
          <button className={styles.activeButton}>Add mood</button>
        </Link>
      </div>

      {showDetails && <DetailsModal emotion={emotion} />}
    </>
  );
}
