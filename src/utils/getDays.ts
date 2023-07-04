export const getDays = (year: number): Date[] => {
  const dates: Date[] = [];
  const startDate = new Date(year, 0, 1);

  while (startDate.getFullYear() === year) {
    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
};
