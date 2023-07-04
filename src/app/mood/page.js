"use client";

import { useState } from "react";
import Image from "next/image";
import supabaseBrowser from "../../lib/browser/client";
import Link from "next/link";
import Exit from "@/components/Exit";
import emo1 from "../../../public/images/emo1.svg";
import emo2 from "../../../public/images/emo2.svg";
import emo3 from "../../../public/images/emo3.svg";
import emo4 from "../../../public/images/emo4.svg";
import emo5 from "../../../public/images/emo5.svg";
import styles from "./page.module.css";

const today = new Date();
const pad = (num) => num.toString().padStart(2, "0");
const initialFormState = {
  mood: null,
  mood_date: `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`,
  journal_entry: "",
  context_people: "",
  context_location: "",
};

console.log(`FS: ${JSON.stringify(initialFormState)}`);

const DetailsModal = () => {
  const [mood, setMood] = useState(initialFormState);

  const handleChange = (e) => {
    setMood({ ...mood, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();

    const user = session.user;
    mood.user_id = user.id;

    const { error } = await supabaseBrowser.from("entries").insert(mood);
    console.log(`ERROR: ${error}`);
    // } catch (error) {
    // }
  };

  return (
    <form className={styles.contextForm} onSubmit={handleSubmit}>
      <label htmlFor="mood">Mood</label>
      <input
        type="hidden"
        name="mood"
        id="mood"
        value={mood.mood}
        onChange={handleChange}
      />
      <label htmlFor="mood_date">Date</label>
      <input
        type="date"
        name="mood_date"
        id="mood_date"
        value={mood.mood_date}
        onChange={handleChange}
      />
      <label htmlFor="journal_entry">Journal Entry</label>
      <textarea
        name="journal_entry"
        id="journal_entry"
        value={mood.journal_entry}
        onChange={handleChange}
      />
      <label htmlFor="context_people">Who were you with?</label>
      <input
        type="text"
        name="context_people"
        id="context_people"
        value={mood.context_people}
        onChange={handleChange}
      />
      <label htmlFor="context_location">Where were you?</label>
      <input
        type="text"
        name="context_location"
        id="context_location"
        value={mood.context_location}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default function MoodPicker() {
  const [emotion, setEmotion] = useState(emo1);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Exit path={"/"} />
      <h1 className={styles.title}>How are you feeling?</h1>
      <span className={styles.center}>
        <Image src={emotion} alt="image" width={150} height={150} />
      </span>
      <div className={styles.flex}>
        {[emo1, emo2, emo3, emo4, emo5].map((svg, i) => (
          <button
            key={i}
            className={styles.hiddenButton}
            onClick={() => setEmotion(svg)}
          >
            <Image src={svg} alt="image" width={60} height={60} />
          </button>
        ))}
      </div>
      {/* <Link href="/"> */}
      <button onClick={() => setShowDetails(true)}>Give more detail?</button>
      {/* </Link> */}
      <Link href="/">
        <button>Add mood</button>
      </Link>

      {showDetails && <DetailsModal />}
      {/* <DetailsModal /> */}
    </>
  );
}
