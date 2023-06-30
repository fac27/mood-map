import Image from "next/image";
import image from "../../public/images/Untitled.jpg";

export default function login() {
  return (
    <>
      <Image src={image} alt="gif" width={100} height={100} />
    </>
  );
}
