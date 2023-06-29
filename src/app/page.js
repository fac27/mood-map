import Image from "next/image";
import {Link} from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return <>
    <h1>Hello Moodsters!</h1>;
    <Link to="login" />
  </>
}
