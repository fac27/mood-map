import { useState } from "react";
import Image from "next/image";
import image from "../../images/Untitled.jpg";

export default function mood() {
  //   const [emotion, setEmotion] = useState("emo1");

  return (
    <>
      <Image src={emo1} alt="image" width={500} height={500} />
      <Image src={emo1} alt="image" width={500} height={500} />
      <Image src={emo2} alt="image" width={500} height={500} />
      <Image src={emo3} alt="image" width={500} height={500} />
      <Image src={emo4} alt="image" width={500} height={500} />
      <Image src={emo5} alt="image" width={500} height={500} />
    </>
  );
}
