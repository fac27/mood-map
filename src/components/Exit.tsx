import Link from "next/link";
import styles from "./Exit.module.css";
import { ReactElement, FunctionComponent } from "react";

const Exit: FunctionComponent<{path: string}> = ({ path }): ReactElement => {
  return (
    <span className={styles.float}>
      <Link href={path} style={{ textDecoration: "none" }}>
        ❌
      </Link>
    </span>
  ) as ReactElement;
};

export default Exit;
