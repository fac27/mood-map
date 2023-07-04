import supabaseBrowser from "../lib/browser/client";
import { useRef, useState } from "react";
import styles from "./DetailsModal.module.css";
import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";

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

const formHeadings = [
  { name: "mood_date", heading: "Date", inputType: "date" },
  { name: "journal_entry", heading: "Journal Entry", inputType: "text" },
  { name: "context_people", heading: "Who were you with?", inputType: "text" },
  { name: "context_location", heading: "Where were you?", inputType: "text" },
];

console.log(`FS: ${JSON.stringify(initialFormState)}`);

export default function DetailsModal({ emotion }) {
  const [mood, setMood] = useState(initialFormState);
  const link = useRef();
  const handleChange = (e) => {
    setMood({ ...mood, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();

    const user = session.user;
    mood.user_id = user.id;
    mood.mood = emotion;
    console.log(mood);
    const { error } = await supabaseBrowser.from("entries").insert(mood);
    console.log(`ERROR: ${JSON.stringify(error)}`);
    if (error === null) {
      //   redirect("/life-in-colour"); // idk why the f*** this doesnt work
      link.current.click();
    }
  };

  return (
    <>
      <form className={styles.contextForm} onSubmit={handleSubmit}>
        <label htmlFor="mood">Mood</label>
        <Image
          src={`/images/emo${emotion}.svg`}
          alt={"you are a 1 out of 5 on a scale of happiness"}
          height={60}
          width={60}
        />
        <input type="hidden" name="mood" id="mood" value={emotion} />
        {formHeadings.map((formElement) => (
          <>
            <label htmlFor={formElement.name}>{formElement.heading}</label>
            <input
              type={formElement.type}
              name={formElement.name}
              id={formElement.name}
              value={mood[formElement.name]}
              onChange={handleChange}
            />
          </>
        ))}
        {/* <label htmlFor="mood_date">Date</label>
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
      /> */}
        <button type="submit">Submit</button>
      </form>
      <Link href={"/life-in-colour"} ref={link} />
    </>
  );
}
