import { FunctionComponent, useRef, useState, ChangeEvent, ReactElement } from 'react';
import supabaseBrowser from '../lib/browser/client';
import styles from './DetailsModal.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Vector from '../../public/images/Vector.svg';
import { useRouter } from 'next/navigation'


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

const InputElement: FunctionComponent<InputElementProps> = ({ formElement, value, state: [mood, setMood] }) => {
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

export const DetailsModal: FunctionComponent<DetailsModalProps> = ({ emotion, onClose }):ReactElement => {
    const [mood, setMood] = useState<Record<string, any>>(initialFormState);
    const link = useRef<HTMLAnchorElement>(null);
    const router = useRouter()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
          data: { session },
        } = await supabaseBrowser.auth.getSession();
      
        if (session) {
          const user = session.user;
          mood.user_id = user.id;
          mood.mood = emotion;
      
          const existingEntry = await supabaseBrowser
            .from("entries")
            .select("*")
            .eq("mood_date", mood.mood_date)
            .eq("user_id", mood.user_id)
            .single();
            
            console.log(existingEntry)

      
          if (existingEntry!==null) {
            const updatedEntry = {
              ...existingEntry,
              mood: mood.mood,
              journal_entry: mood.journal_entry,
              context_people: mood.context_people,
              context_location: mood.context_location,
            };


      
            const { error } = await supabaseBrowser
              .from("entries")
              .update(updatedEntry)
              .eq("id", existingEntry.id);
            if (error) {
              console.error(`ERROR: ${JSON.stringify(error)}`);
              router.push("/");
            } else {
              // Update successful
              if (link.current !== null) {
                link.current.click();
              }
            }
          } else {
            const { error } = await supabaseBrowser.from("entries").insert(mood);
      
            if (error) {
              console.error(`ERROR: ${JSON.stringify(error)}`);
              router.push("/");
            } else {
              // Insert successful
              if (link.current !== null) {
                link.current.click();
              }
            }
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
            <Link href={"/"} ref={link} />
        </>
    );
};