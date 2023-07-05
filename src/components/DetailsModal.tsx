import supabaseBrowser from "../lib/browser/client";
import { useRef, useState, FC, Dispatch,SetStateAction, ReactElement  } from "react";
import styles from "./DetailsModal.module.css";
import Image from "next/image";
import Link from "next/link";

interface IFormElement {
    name: string,
    heading: string,
    type: string,
    options?: string[]
  }

interface IInputElement {
  formElement: IFormElement, 
  value: string, 
  state: [IInitialFormState, Dispatch<SetStateAction<IInitialFormState>>] //idk if this is how it works?
}

interface IInitialFormState {
  user_id: undefined | string,
  mood: number,
  mood_date: string,
  journal_entry:string,
  context_people: string,
  context_location: string,
};

const InputElement: FC<IInputElement>  = ({ formElement, value, state: [mood, setMood] } ): ReactElement => {
  const isRadio: boolean = formElement.type === "radio";

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
const trailingZero = (num: number) => num.toString().padStart(2, "0");

const initialFormState = {
  user_id: undefined,
  mood: 4,
  mood_date: `${today.getFullYear()}-${trailingZero(
    today.getMonth() + 1
  )}-${trailingZero(today.getDate())}`,
  journal_entry: "",
  context_people: "",
  context_location: "",
};

const formElements: IFormElement[] = [
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

const DetailsModal = ({ emotion }: {emotion: number}): ReactElement => {
  const [mood, setMood] = useState(initialFormState);
  const link = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { session },
      error: sessionError
    } = await supabaseBrowser.auth.getSession();

    if (sessionError) return
    const user = session!.user; // the '!' shows that we have accounted for possibilty of null object
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
        <fieldset>
          <label htmlFor="mood">Mood</label>
          <Image
            src={`/images/emo${emotion}.svg`}
            alt={"you are a 1 out of 5 on a scale of happiness"}
            height={60}
            width={60}
          />
          <input type="hidden" name="mood" id="mood" value={emotion} />
        </fieldset>
        {formElements.map((formElement, elementIndex) => (
          <fieldset key={elementIndex}>
            {formElement.type === "radio" ? (
              <>
                {formElement!.options.map((option, radioIndex) => (
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
        <button type="submit">Submit</button>
      </form>
      <Link href={"/life-in-colour"} ref={link} />
    </>
  );
}

export default DetailsModal