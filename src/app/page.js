import { SvgBlob } from "react-svg-blob";
import styles from "@/app/page.module.css";
import Navbar from "@/components/Navbar";
import { blobs } from "@/utils/blobGenerator";
import getSessionServer from "../lib/server/session";

export default async function Home() {
  const user = await getSessionServer();

  const blobElements = blobs.map((blob) => {
    return blob.variant === "solid" ? (
      <div key={blob.id} className={styles.blob}>
        <p className={styles.blobText}>{blob.text}</p>
        <SvgBlob
          variant={blob.variant}
          shapeProps={blob.shapeProps}
          color={blob.color}
        />
      </div>
    ) : (
      <div key={blob.id} className={styles.blob}>
        <p className={styles.blobText}>{blob.text}</p>
        <SvgBlob
          variant={blob.variant}
          shapeProps={blob.shapeProps}
          colors={blob.color}
        />
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
