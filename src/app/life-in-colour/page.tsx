import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import GridDays from "./components/GridDays";
import { getSessionServer } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { getAllEntries } from "@/lib/models";

const Grid = async () => {
  const session = await getSessionServer();
  if (!session) redirect("/login");

  const allEntries = await getAllEntries(session.user.id);
  const entriesSortedByDate = allEntries.sort((a, b) => {
    const dateA = new Date(a.mood_date);
    const dateB = new Date(b.mood_date);
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  });

  return (
    <>
      <h1 className={styles.pageHeader}>My Life in Colour</h1>
      <div className={`${styles.pageContainer} ${styles.padBottom}`}>
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
          <GridDays allEntries={entriesSortedByDate} />
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Grid;
