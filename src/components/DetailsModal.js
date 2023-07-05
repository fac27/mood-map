import supabaseBrowser from "../lib/browser/client";
import { useRef, useState } from "react";
import styles from "./DetailsModal.module.css";
import Image from "next/image";
import Link from "next/link";
import Vector from "../../public/images/Vector.svg";

function InputElement({ formElement, value, state: [mood, setMood] }) {
  const isRadio = formElement.type === "radio";

  return (
    <>
      <label htmlFor={isRadio ? value : formElement.name}>
        {isRadio ? value : formElement.heading}
      </label>
      <input
        type={formElement.type}
        name={formElement.name}
        id={formElement.name}
        value={value}
        onChange={(e) => setMood({ ...mood, [e.target.name]: e.target.value })}
      />
    </>
  );
}

const today = new Date();
const trailingZero = (num) => num.toString().padStart(2, "0");
const initialFormState = {
  mood: null,
  mood_date: `${today.getFullYear()}-${trailingZero(
    today.getMonth() + 1
  )}-${trailingZero(today.getDate())}`,
  journal_entry: "",
  context_people: "",
  context_location: "",
};

const formElements = [
  { name: "mood_date", heading: "Date", type: "date" },
  { name: "journal_entry", heading: "Journal Entry", type: "text" },
  {
    name: "context_people",
    heading: "Who were you with?",
    type: "radio",
    options: ["Myself", "Friends", "Family"],
  },
  {
    name: "context_location",
    heading: "Where were you?",
    type: "radio",
    options: ["Home", "Work", "Transport", "Outside"],
  },
];

export default function DetailsModal({ emotion, onClose }) {
  const [mood, setMood] = useState(initialFormState);
  const link = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();

    const user = session.user;
    mood.user_id = user.id;
    mood.mood = emotion;
    const { error } = await supabaseBrowser.from("entries").insert(mood);
    console.log(`ERROR: ${JSON.stringify(error)}`);
    if (error === null) link.current.click();
    //   redirect("/life-in-colour"); // idk why the f*** this doesnt work
  };

  return (
    <>
      <form className={styles.contextForm} onSubmit={handleSubmit}>
        <span className={styles.exit} onClick={onClose}>
          <Image src={Vector} alt="exit" width={20} height={20} />
        </span>
        <fieldset className={styles.moodFieldset}>
          <label htmlFor="mood">Mood</label>
          <Image
            src={`/images/emo${emotion}.svg`}
            alt={"you are a 1 out of 5 on a scale of happiness"}
            height={60}
            width={60}
          />
          <input type="hidden" name="mood" id="mood" value={emotion} />
        </fieldset>
        <hr />
        {formElements.map((formElement, elementIndex) => (
          <fieldset key={elementIndex}>
            {formElement.type === "radio" ? (
              <>
                {formElement.options.map((option, radioIndex) => (
                  <InputElement
                    key={`${elementIndex}${radioIndex}`}
                    formElement={formElement}
                    value={option}
                    state={[mood, setMood]}
                  />
                ))}
              </>
            ) : (
              <InputElement
                formElement={formElement}
                value={mood[formElement.name]}
                state={[mood, setMood]}
              />
            )}
          </fieldset>
        ))}
        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </form>
      <Link href={"/life-in-colour"} ref={link} />
    </>
  );
}
