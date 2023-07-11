import { ReactElement, FC } from "react";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import GridDays from "./components/GridDays";

const Grid: FC = (): ReactElement => {
  return (
    <>
      <h1 className={styles.pageHeader}>My Life in Colour</h1>
      <div className={styles.pageContainer}>
        <div className={styles.grid}>
          <p>M</p>
          <p>T</p>
          <p>W</p>
          <p>T</p>
          <p>F</p>
          <p>S</p>
          <p>S</p>
        </div>
        <div className={styles.grid}>
          <GridDays />
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Grid;
