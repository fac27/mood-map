import { v4 as uuidv4 } from "uuid";
import { FaPersonSkating } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { IEntry } from "@/types/types";
import { josefinSans } from "../utils/fonts";
import styles from "@/app/page.module.css";
import { protectServerRoute } from "../lib/server/session";
import { getTodaysEntry } from "@/lib/models";
import { formatText, generateBlob } from "../utils/blobHelpers";
import getRecentlyPlayedSong from "@/utils/spotifyHelper";
import Navbar from "@/components/Navbar";
import { Player } from "@/components/SpotifyPlayer";
import { ReactElement } from "react";
import StreakDisplay from "@/components/StreakDisplay";

async function checkEntryForToday(userId: string): Promise<IEntry> {
  const entry: IEntry = await getTodaysEntry(userId);
  return entry;
}

export default async function Home(): Promise<ReactElement> {
  const session = await protectServerRoute();
  const user = session?.user;
  const entry: IEntry = (await checkEntryForToday(user?.id ?? "")) || {};
  const entryInfo = Object.values(entry).slice(2);
  const hasMoodDetails = Boolean(entry.journal_entry);
  const today = new Date();
  const hasMood = Boolean(Object.keys(entry).length);
  const provider = session?.user.app_metadata?.provider === "spotify";
  const recentlyPlayed = await getRecentlyPlayedSong(session, "2023-07-10", 1);

  const blobElements =
    hasMoodDetails &&
    entryInfo?.map((info) => {
      const svg = generateBlob();

      return (
        <div key={uuidv4()} className={styles.blob}>
          <div className={`${styles.textContainer} ${josefinSans.className}`}>
            {formatText(info).map((line) => (
              <p
                className={
                  svg.colour === "light"
                    ? `${styles.darkText}`
                    : `${styles.lightText}`
                }
                key={uuidv4()}
              >
                {line.join("")}
              </p>
            ))}
          </div>

          <svg viewBox={svg.viewBox} xmlns={svg.xmlns}>
            <path
              fill={svg.path.fill}
              d={svg.path.d}
              transform={svg.path.transform}
            />
          </svg>
        </div>
      );
    });

  return (
    <div className={`${styles.container} ${styles.padBottom}`}>
      <div className={styles.header}>
        <h1>Hello, {user?.email} </h1>
        <StreakDisplay today={today} userId={user ? user.id : ""} />
        {hasMood ? (
          <p className={styles.moodHeader}>
            Mood for the day{" "}
            <Image
              src={`/images/emo${entry?.mood}.svg`}
              alt="mood of the day"
              width={40}
              height={40}
              style={{ marginLeft: "10px" }}
            />
          </p>
        ) : (
          ""
        )}
        {provider ? <Player href={recentlyPlayed} /> : ""}
      </div>
      {blobElements ? (
        <div className={styles.blobContainer}>{blobElements}</div>
      ) : (
        <div className={styles.noDetailsContainer}>
          <p>
            You have not added details for your mood today{" "}
            <span>
              <FaPersonSkating />
            </span>
          </p>
          <button>
            <Link href={"/mood"}>Add details</Link>
          </button>
        </div>
      )}
      <Navbar />
    </div>
  );
}
