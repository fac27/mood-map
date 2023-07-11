const date = (): string => {
  const currentDate: Date = new Date();
  const year: number = currentDate.getFullYear();
  const month: string = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day: string = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default date;
