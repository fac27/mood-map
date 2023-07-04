import { ReactElement, FC } from "react";
import styles from "./page.module.css";
import { getDays } from "../../utils/getDays";

const Grid: FC = (): ReactElement => {
  const divDays = getDays(2023);
  const divDayElements: ReactElement[] = divDays.map((day: Date) => {
    const dateOfMonth = day.getDate();
    const firstDayOfWeek = new Date(
      day.getFullYear(),
      day.getMonth(),
      1
    ).getDay();
    let gridColumn = ((firstDayOfWeek + 6) % 7) + 1;

    if (dateOfMonth > 1) {
      gridColumn = ((gridColumn + dateOfMonth - 2) % 7) + 1;
    }
    return <div className={styles.gridBox} key={day.toString()}></div>;
  });

  return (
    <>
      <h1 className={styles.header}>My Life in Colour</h1>
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          <p>M</p>
          <p>T</p>
          <p>W</p>
          <p>T</p>
          <p>F</p>
          <p>S</p>
          <p>S</p>
        </div>
        <div className={styles.gridBoxes}>{divDayElements}</div>
      </div>
    </>
  );
};

export default Grid;
