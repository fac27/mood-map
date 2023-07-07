"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Exit from "@/components/Exit";
import styles from "./page.module.css";
import DetailsModal from "@/components/DetailsModal";
import createEntry from "@/lib/db/createEntry";

export default function MoodPicker() {
  const [emotion, setEmotion] = useState(4);
  const [showDetails, setShowDetails] = useState(false);
  const [isError, setIsError] = useState(false);
  const redirect = useRef();

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

  async function addMood() {
    const error = await createEntry({ mood: emotion, mood_date: new Date() });
    if (error) return setIsError(true);
    setIsError(false);
    console.log(error);
  }

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
        <button className={styles.activeButton} onClick={addMood}>
          Add mood
        </button>
      </div>
      {isError ? (
        <b className={styles.errorDescription}>Already given your mood today</b>
      ) : null}
      <Link href="/" ref={redirect} />

      {showDetails && <DetailsModal emotion={emotion} onClose={closeModal} />}
    </>
  );
}
