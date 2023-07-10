import styles from "@/app/page.module.css";
import Navbar from "@/components/Navbar.tsx";
import { formatText, generateBlobs } from "../utils/blobHelpers";
import { protectServerRoute } from "../lib/server/session";
import { josefinSans } from "../utils/fonts";
import { v4 as uuidv4 } from "uuid";
import { getTodaysEntry } from "@/lib/models";
import { redirect } from "next/navigation";

async function checkEntryForToday(userId) {
  const entry = await getTodaysEntry(userId);
  console.log(entry);
  if (!entry) redirect("/mood");
}

export default async function Home() {
  const session = await protectServerRoute();
  const user = session.user;

  await checkEntryForToday(user.id);

  const blobs = generateBlobs();
  const blobElements = blobs.map((svg) => {
    return (
      <div key={uuidv4()} className={styles.blob}>
        <div className={`${styles.textContainer} ${josefinSans.className}`}>
          {formatText(svg.text).map((line, idx) => (
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
        <h1>Hello, {user.email} </h1>
        <p>Mood for the day</p>
      </div>

      <div className={styles.blobContainer}>{blobElements}</div>
      <Navbar />
    </div>
  );
}
