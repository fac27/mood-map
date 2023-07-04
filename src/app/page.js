import Navbar from "../components/Navbar";
import getSessionServer from "../lib/server/session";

export default async function Home() {
  const user = await getSessionServer();
  return (
    <>
      <h1>Hello {user.email || "moodster"}! 🤺</h1>
      <Navbar />
    </>
  );
}
