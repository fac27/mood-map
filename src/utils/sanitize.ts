import { IUserEntry } from "@/types/types";

const sanitise = (inputString: string) => {
  const cleanData = inputString.replace(/</g, "&lt;");
  return cleanData;
};
const sanitiseEntry = (entry: IUserEntry) => {
  for (const field in entry) {
    if (typeof (entry as any)[field] === "string") {
      (entry as any)[field] = sanitise((entry as any)[field]);
    }
  }
};

export default sanitiseEntry;
