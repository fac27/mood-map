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
import { Player } from "@/components/SpotifyPlayer";
import getRecentlyPlayedSong from "@/utils/spotifyHelper";


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
  const provider = session?.user.app_metadata?.provider === 'spotify'

//   async function getRecentlyPlayedSongTest() {
//     try {
//       const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=1`, {
//         method: 'GET',  
//         headers: {
//           Authorization: `Bearer ${session?.provider_token}`
//         }
//       })
//       const responseJson = await response.json();
//       const track = responseJson.items[0].track;
//       return track;
//     } catch (e) {
//       console.error('❌', e)
//     }
//   }
//   const recentlyPlayedTest = await getRecentlyPlayedSongTest()
  
  const recentlyPlayed = await getRecentlyPlayedSong(session, "2023-07-10", 1);


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
        {provider ? <Player href={recentlyPlayed[0]}/>
        : ''}
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
