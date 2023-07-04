import { ReactElement, FC } from "react";
import styles from "./page.module.css";
import { getMonths } from "../../utils/dateHelpers";

const Grid: FC = (): ReactElement => {
  const monthData: { [key: string]: Date[] } = getMonths(2023);
  const dateElements: ReactElement[] = Object.entries(monthData).map(
    ([month, days], idx) => {
      return (
        <div key={idx} className={styles.monthContainer}>
          <h4>{month}</h4>
          <ul className={styles.dayContainer}>
            {days.map((day, idx) => (
              <li key={idx} className={styles.dayBox}></li>
            ))}
          </ul>
        </div>
      );
    }
  );

  return (
    <>
      <h1 className={styles.header}>My Life in Colour</h1>
      <div className={styles.gridContainer}>{dateElements}</div>
    </>
  );
};

export default Grid;
