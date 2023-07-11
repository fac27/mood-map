import { getAllEntries } from "@/lib/models";
import { StreakData, IEntry } from "@/types/types";

export const getStreaks = async (
  today: Date,
  userId: string
): Promise<StreakData> => {
  const userEntries: IEntry[] = await getAllEntries(userId);
  userEntries.sort((a, b) => {
    const dateA = new Date(a.mood_date);
    const dateB = new Date(b.mood_date);
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  });

  if (userEntries.length === 0) return { current: 0, allTime: 0 };

  const earliestDate: Date = new Date(userEntries[0].mood_date);
  const latestDate: Date = new Date(
    userEntries[userEntries.length - 1].mood_date
  );

  if (earliestDate.toDateString() === latestDate.toDateString())
    return { current: 1, allTime: 1 };

  const streaks: number[] = [];
  let streak = 0;
  for (let d = earliestDate; d <= today; d.setDate(d.getDate() + 1)) {
    if (entryExistsForDate(d, userEntries)) {
      streak += 1;
    } else {
      if (streak) streaks.push(streak);
      streak = 0;
    }
  }
  if (streak) streaks.push(streak);

  return {
    current: streaks[streaks.length - 1],
    allTime: Math.max(...streaks),
  };
};

const entryExistsForDate = (date: Date, allEntries: IEntry[]): boolean => {
  const dateAsString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;

  return allEntries.find((o) => o.mood_date === dateAsString) ? true : false;
};

const pad = (n: number) => n.toString().padStart(2, "0");
