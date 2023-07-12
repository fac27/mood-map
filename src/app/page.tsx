import styles from "@/app/page.module.css";
import Navbar from "@/components/Navbar";
import { formatText, generateBlob } from "../utils/blobHelpers";
import { protectServerRoute } from "../lib/server/session";
import { josefinSans } from "../utils/fonts";
import { v4 as uuidv4 } from "uuid";
import { getTodaysEntry } from "@/lib/models";
// import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaPersonSkating } from "react-icons/fa6";
import { ReactElement } from "react";
import { IEntry } from "@/types/types";
import StreakDisplay from "@/components/StreakDisplay";

async function checkEntryForToday(userId: string): Promise<IEntry> {
  const entry: IEntry = await getTodaysEntry(userId);
  // if (!entry) redirect("/mood");
  return entry;
}

export default async function Home(): Promise<ReactElement> {
  const session = await protectServerRoute();
  const user = session?.user;
  const entry: IEntry = await checkEntryForToday(user ? user.id : "");
  const entryInfo = entry ? Object.values(entry).slice(2) : null;
  const moodHasDetails = Boolean(entry?.journal_entry);
  const today = new Date();

  const blobElements =
    moodHasDetails &&
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
