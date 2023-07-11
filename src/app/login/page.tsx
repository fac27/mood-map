import styles from "./page.module.css";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <>
      <h1 className={styles.title}>Mood Map</h1>
      <div className={styles.wrapper}>
        <LoginForm />
      </div>
    </>
  );
}
