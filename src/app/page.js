import styles from "@/app/page.module.css";
import Navbar from "@/components/Navbar";
import { generateBlobs } from "../utils/blobHelpers";
import getSessionServer from "../lib/server/session";

export default async function Home() {
  const user = await getSessionServer();

  const blobs = generateBlobs();
  const blobElements = blobs.map((svg) => {
    return (
      <svg
        key={svg.id}
        className={styles.blob}
        viewBox={svg.viewBox}
        xmlns={svg.xmlns}
      >
        <path
          fill={svg.path.fill}
          d={svg.path.d}
          transform={svg.path.transform}
        />
      </svg>
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
