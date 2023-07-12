import styles from "@/app/page.module.css";
import Navbar from "@/components/Navbar";
import { formatText, generateBlob } from "../utils/blobHelpers";
import { protectServerRoute } from "../lib/server/session";
import { josefinSans } from "../utils/fonts";
import { v4 as uuidv4 } from "uuid";
import { getTodaysEntry } from "@/lib/models";
import Image from "next/image";
import Link from "next/link";
import { FaPersonSkating } from "react-icons/fa6";
import { ReactElement } from "react";
import { IEntry } from "@/types/types";

async function checkEntryForToday(userId: string): Promise<IEntry> {
  const entry: IEntry = await getTodaysEntry(userId);
  // if (!entry) redirect("/mood");
  return entry;
}

export default async function Home(): Promise<ReactElement> {
  const session = await protectServerRoute();
  const user = session?.user;
  const entry: IEntry = (await checkEntryForToday(user?.id ?? "")) || {};
  const entryInfo = Object.values(entry).slice(2);
  const hasMoodDetails = Boolean(entry.journal_entry);
  const hasMood = Boolean(Object.keys(entry).length);

  const blobElements =
    hasMoodDetails &&
    entryInfo.map((info) => {
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Hello, {user?.email} </h1>
        {hasMood ? (
          <p className={styles.moodHeader}>
            Mood for the day{" "}
            <Image
              src={`/images/emo${entry.mood}.svg`}
              alt="mood of the day"
              width={40}
              height={40}
              style={{ marginLeft: "10px" }}
            />
          </p>
        ) : (
          ""
        )}
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
