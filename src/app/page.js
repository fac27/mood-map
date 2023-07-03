import { SvgBlob } from "react-svg-blob";
import styles from "@/app/page.module.css";
import Navbar from "@/components/Navbar";

import { getRandomColor, generateShapeProps } from "@/utils/blobGenerator";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Hello, Emily </h1>
        <p>Today's mood</p>
      </div>

      <div className={styles.shape}>
        <SvgBlob
          color={getRandomColor()}
          variant="solid"
          shapeProps={generateShapeProps()}
        />
      </div>

      <div className={styles.shape}>
        <SvgBlob
          variant="gradient"
          colors={[getRandomColor(), getRandomColor()]}
          shapeProps={generateShapeProps()}
        />
      </div>
      <Navbar />
    </div>
  );
}
