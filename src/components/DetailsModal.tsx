import {
  FunctionComponent,
  useRef,
  useState,
  ChangeEvent,
  ReactElement,
} from "react";
import supabaseBrowser from "../lib/browser/client";
import styles from "./DetailsModal.module.css";
import Image from "next/image";
import Link from "next/link";
import Vector from "../../public/images/Vector.svg";
import { useRouter } from "next/navigation";
// import { getSessionBrowser } from "@/lib/browser/session";

interface FormElement {
  name: string;
  heading: string;
  type: string;
  options?: string[];
}

interface InputElementProps {
  formElement: FormElement;
  value: string;
  state: [Record<string, any>, (mood: Record<string, any>) => void];
}

interface DetailsModalProps {
  emotion: string;
  onClose: () => void;
}

const InputElement: FunctionComponent<InputElementProps> = ({
  formElement,
  value,
  state: [mood, setMood],
}) => {
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
};

const today = new Date();
const trailingZero = (num: number) => num.toString().padStart(2, "0");
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
const capitaliseWords = (str: string) => {
  return str
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const DetailsModal: FunctionComponent<DetailsModalProps> = ({
  emotion,
  onClose,
}): ReactElement => {
  const [mood, setMood] = useState<Record<string, any>>(initialFormState);
  const link = useRef<HTMLAnchorElement>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  //could be refactored again with Mark's updates
  const createOrUpdateEntry = async (
    existingEntry: any,
    updatedMood: any
  ) => {
    if (existingEntry.data) {
      const { data: updatedEntry, error } = await supabaseBrowser
        .from("entries")
        .update({
          mood: updatedMood.mood,
          journal_entry: updatedMood.journal_entry,
          context_people: updatedMood.context_people,
          context_location: updatedMood.context_location,
        })
        .eq("id", existingEntry.data.id);

      return { data: updatedEntry, error };
    } else {
      return await supabaseBrowser.from("entries").insert(updatedMood);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();

    if (!session) return;

    const user = session.user;
    const updatedMood = { ...mood, user_id: user.id, mood: emotion };
    setMood(updatedMood);

    const existingEntry = await supabaseBrowser
      .from("entries")
      .select("*")
      .eq("mood_date", updatedMood.mood_date)
      .eq("user_id", updatedMood.user_id)
      .single();

    const { error } = await createOrUpdateEntry(existingEntry, updatedMood);

    if (error) {
      console.error(`ERROR: ${JSON.stringify(error)}`);
      Object.keys(mood).forEach((row) =>
        error.message.includes(row) ? setError(row) : false
      );
      router.push("/");
    } else {
      if (link.current !== null) {
        link.current.click();
      }
    }
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
};
