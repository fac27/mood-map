export const getDays = (year: number): Date[] => {
  const dates: Date[] = [];
  const startDate = new Date(year, 0, 1);
  while (startDate.getFullYear() === year) {
    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
};

// export const getMonths = (year: number): { [key: string]: Date[] } => {
//   const months: { [key: string]: Date[] } = {};
//   const startDate = new Date(year, 0, 1);

//   for (let month = 0; month < 12; month++) {
//     const endDate = new Date(year, month + 1, 0);
//     const currentMonth = startDate.toLocaleString("default", { month: "long" });
//     const currentDate = new Date(startDate);

//     while (currentDate <= endDate) {
//       if (!months[currentMonth]) {
//         months[currentMonth] = [];
//       }

//       const dateWithoutTime = new Date(currentDate);
//       dateWithoutTime.setHours(0, 0, 0, 0);
//       months[currentMonth].push(dateWithoutTime);
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     startDate.setMonth(startDate.getMonth() + 1);
//   }

//   return months;
// };
