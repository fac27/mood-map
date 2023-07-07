import { useRef, useState } from "react";
import styles from "./DetailsModal.module.css";
import Image from "next/image";
import Link from "next/link";
import Vector from "../../public/images/Vector.svg";
import createEntry from "@/lib/db/createEntry";

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

function capitaliseWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function DetailsModal({ emotion, onClose }) {
  const [mood, setMood] = useState(initialFormState);
  const link = useRef();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await createEntry({ ...mood, mood: emotion });
    if (error === null) return link.current.click();
    Object.keys(mood).forEach((row) =>
      error.message.includes(row) ? setError(row) : false
    );
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
          <fieldset
            key={elementIndex}
            className={error == formElement.name ? styles.error : ""}
          >
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
        {error ? (
          <b className={styles.errorDescription}>
            Invalid: {capitaliseWords(error.replaceAll("_", " "))}
          </b>
        ) : null}
      </form>
      <Link href={"/life-in-colour"} ref={link} />
    </>
  );
}
