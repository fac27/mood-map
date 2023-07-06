import styles from "@/app/page.module.css";
import Navbar from "@/components/Navbar";
import { formatText, generateBlobs } from "../utils/blobHelpers";
import getSessionServer from "../lib/server/session";
import { josefinSans } from "../utils/fonts";

export default async function Home() {
  const user = await getSessionServer();

  const blobs = generateBlobs();
  const blobElements = blobs.map((svg) => {
    return (
      <div key={svg.id} className={styles.blob}>
        <div className={`${styles.textContainer} ${josefinSans.className}`}>
          {formatText(svg.text).map((line, idx) => (
            <p
              className={
                svg.colour === "light"
                  ? `${styles.darkText}`
                  : `${styles.lightText}`
              }
              key={idx}
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
