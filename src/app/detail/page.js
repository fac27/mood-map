import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { PiSmileyFill } from "react-icons/pi";
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { MdWorkHistory } from "react-icons/md";
import { TbFriends } from "react-icons/tb";
import { FaPeopleRoof, FaTrainSubway, FaCloudMoonRain } from "react-icons/fa6";

export default function Detail() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          Hello, Emiy{" "}
          <span>
            <PiSmileyFill />
          </span>
        </h1>
        <h2>What have you done today?</h2>
      </div>

      <div className={styles.detailPeople}>
        <h2> 👨‍👩‍👧‍👧 Who were you with today?</h2>
        <div className={styles.iconContainer}>
          <article>
            <AiOutlineUser />
            <p>Myself</p>
          </article>

          <article>
            <TbFriends />
            <p>Friends</p>
          </article>

          <article>
            <FaPeopleRoof />
            <p>Family</p>
          </article>
        </div>
      </div>

      <div className={styles.detailPlace}>
        <h2> 🌍 Where were you?</h2>
        <div className={styles.iconContainer}>
          <article>
            <AiOutlineHome />
            <p>Home</p>
          </article>

          <article>
            <MdWorkHistory />
            <p>Work</p>
          </article>

          <article>
            <FaTrainSubway />
            <p>Transport</p>
          </article>

          <article>
            <FaCloudMoonRain />
            <p>Outside</p>
          </article>
        </div>
      </div>

      <div className={styles.detailMusic}>
        <h2> 🎶 What were you listening to?</h2>
      </div>

      <button type="button">Add entry</button>

      <Navbar />
    </div>
  );
}
