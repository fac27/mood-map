import Navbar from "";
// import { useState } from "react";

export default function Entry() {
  //   const [show, setShow] = useState(False);

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
