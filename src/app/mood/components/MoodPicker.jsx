"use client";

import { useState } from "react";
import Image from "next/image";
import Exit from "@/components/Exit";
import styles from "../page.module.css";
import DetailsModal from "@/components/DetailsModal";
import { updateOrCreateEntry } from "@/lib/models";
import { useRouter } from "next/navigation";

export default function MoodPicker({ session }) {
  const [emotion, setEmotion] = useState(4);
  const [showDetails, setShowDetails] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  async function addMood() {
    if (!session) return setIsError(true);
    const error = await updateOrCreateEntry({
      mood: emotion,
      mood_date: new Date().toLocaleDateString("en-UK", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      user_id: session.user.id,
    });
    if (error) return setIsError(true);
    setIsError(false);
    router.push("/life-in-colour");
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
        {[1, 2, 3, 4, 5].map((emotion) => (
          <Image
            key={emotion}
            className={styles.emojiBox}
            onClick={() => setEmotion(emotion)}
            src={`/images/emo${emotion}.svg`}
            alt="image"
            width={60}
            height={60}
          />
        ))}
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

      {showDetails && (
        <DetailsModal
          emotion={emotion}
          onClose={() => setShowDetails(false)}
          session={session}
        />
      )}
    </>
  );
}
