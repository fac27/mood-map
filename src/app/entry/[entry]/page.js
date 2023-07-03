import Navbar from "../../";

export default function entry() {
  return (
    <>
      <h1>
        {new Date().toLocaleDateString("en-UK", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </h1>

      <Navbar />
    </>
  );
}
