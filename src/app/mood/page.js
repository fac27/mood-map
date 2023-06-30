import Image from "next/image";
import image from "../../images/Untitled.jpg";

export default function mood() {
  return (
    <>
      <Image src={image} alt="image" width={500} height={500} />
    </>
  );
}
