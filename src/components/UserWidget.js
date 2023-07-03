// "use client";

// import { useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import avatar from "animal-avatar-generator";
// import fs from "node:fs";

// export default function UserWidget({ name }) {
//   console.log(name);

//   useEffect(() => {
//     const svg = avatar(name, { size: 200 });
//     fs.writeFileSync("../../images/pp.svg", svg);
//   }, [name]);

//   return (
//     <span>
//       <Link href={"/login"}>
//         <img src="/eye.svg" alt="An SVG of an eye" />
//         {/* <Image src={svg} alt="profile picture" width={75} height={75} /> */}
//       </Link>
//     </span>
//   );
// }
