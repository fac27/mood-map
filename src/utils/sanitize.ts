import { IUserEntry } from "@/types/types";

const sanitise = (inputString: string) => {
  const cleanData = inputString.replace(/</g, "&lt;");
  return cleanData;
};
const sanitiseEntry = (entry: IUserEntry) => {
  for (const field in entry) {
    if (typeof entry[field] === "string") {
      entry[field] = sanitise(entry[field]);
    }
  }
};

export default sanitiseEntry;
