import { SvgBlob } from "react-svg-blob";
import styles from "@/app/page.module.css";
import Navbar from "@/components/Navbar";
import { blobs } from "@/utils/blobGenerator";

export default function Home() {
  const blobElements = blobs.map((blob) => {
    return blob.variant === "solid" ? (
      <SvgBlob
        key={blob.id}
        variant={blob.variant}
        shapeProps={blob.shapeProps}
        color={blob.color}
        className={styles.blob}
      />
    ) : (
      <SvgBlob
        key={blob.id}
        variant={blob.variant}
        shapeProps={blob.shapeProps}
        colors={blob.color}
        className={styles.blob}
      />
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Hello, Emily </h1>
        <p>Today's mood</p>
      </div>

      <div className={styles.blobContainer}>{blobElements}</div>
      <Navbar />
    </div>
  );
}
