"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Exit from "@/components/Exit";
import styles from "./page.module.css";
// import DetailsModal from "@/components/DetailsModal";
import { DetailsModal } from "@/components/DetailsModal.tsx";

export default function MoodPicker() {
  const [emotion, setEmotion] = useState(4);
  const [showDetails, setShowDetails] = useState(false);

  const closeModal = () => setShowDetails(false);

  const EmojiElements = () =>
    [1, 2, 3, 4, 5].map((emotion) => (
      <Image
        key={emotion}
        className={styles.emojiBox}
        onClick={() => setEmotion(emotion)}
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
          alt="default emotion"
          width={60}
          height={60}
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

      {showDetails && <DetailsModal emotion={emotion} onClose={closeModal} />}
    </>
  );
}
