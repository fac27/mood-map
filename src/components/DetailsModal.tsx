import {
  FunctionComponent,
  useRef,
  useState,
  ReactElement,
  useEffect,
} from "react";
import styles from "./DetailsModal.module.css";
import Image from "next/image";
import Link from "next/link";
import Vector from "../../public/images/Vector.svg";
import { useRouter } from "next/navigation";
import { updateOrCreateEntry } from "@/lib/models";

interface FormElement {
  name: string;
  heading: string;
  type: string;
  options?: string[];
}

interface InputElementProps {
  formElement: FormElement;
  value: string;
  state: [any, any];
}

interface DetailsModalProps {
  emotion: number;
  onClose: () => void;
  session: any; //supabase session object
}
interface Mood {
  mood: number;
  mood_date: string;
  journal_entry: string;
  context_people: string;
  context_location: string;
  user_id: any;
}

const InputElement: FunctionComponent<InputElementProps> = ({
  formElement,
  value,
  state: [mood, setMood],
}) => {
  const isRadio = formElement.type === "radio";
  const currentDate = new Date()
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return (
    <>
      <label htmlFor={isRadio ? value : formElement.name}>
        {isRadio ? value : formElement.heading}
      </label>
      <input
        type={formElement.type}
        max={formElement.type === 'date' ? formattedDate : ''}
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

const DetailsModal: FunctionComponent<DetailsModalProps> = ({
  emotion,
  onClose,
  session,
}): ReactElement => {
  const [mood, setMood] = useState({
    user_id: "",
    mood: emotion,
    mood_date: `${today.getFullYear()}-${trailingZero(
      today.getMonth() + 1
    )}-${trailingZero(today.getDate())}`,
    journal_entry: "",
    context_people: "",
    context_location: "",
  });
  const [error, setError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const link = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const user = session.user;

    setMood({
      ...mood,
      user_id: user.id,
      mood: emotion,
    });
    setHasSubmitted(true);
  };

  useEffect(() => {
    if (!hasSubmitted) return;
    const handleMoodEntry = async () => {
      const supabaseError = await updateOrCreateEntry(mood);

      if (!supabaseError) return router.push("/life-in-colour");
      Object.keys(mood).forEach((row) =>
        supabaseError.message.includes(row) ? setError(row) : false
      );
    };
    handleMoodEntry();
  }, [mood]);

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
                {formElement.options?.map((option, radioIndex) => (
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
                value={mood[formElement.name as keyof typeof mood] as string}
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

export default DetailsModal;
