import { useState, useRef, useEffect, ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import Exit from "@/components/Exit";
import styles from "./page.module.css";
import DetailsModal from "@/components/DetailsModal";
import { updateOrCreateEntry } from "@/lib/models";
import { protectBrowserRoute } from "@/lib/browser/session";
import { useRouter } from "next/router";
import { IUsersEntry } from "@/types/types";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function MoodPicker(): ReactElement {
  const [emotion, setEmotion] = useState<number>(4);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const redirect = useRef<HTMLAnchorElement | null>(null);
  const router = useRouter();

  const closeModal = (): void => setShowDetails(false);

  const EmojiElements = (): ReactElement[] =>
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

  const addMood = async (): Promise<void> => {
    if (!session) setIsError(true);
    const error = await updateOrCreateEntry({
      mood: emotion,
      mood_date: new Date().toLocaleDateString("en-UK", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      user_id: session?.user?.id,
    } as IUsersEntry);
    if (error) return setIsError(true);
    setIsError(false);
    router.push("/life-in-colour");
  };

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      const session = await protectBrowserRoute();
      setSession(session);
    };
    getUser();
  }, []);

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
      <Link href="/" passHref>
        <a ref={redirect} />
      </Link>

      {showDetails && (
        <DetailsModal
          emotion={emotion}
          onClose={closeModal}
          session={session}
        />
      )}
    </>
  );
}
