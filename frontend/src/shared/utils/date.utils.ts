export const formatDate = (inputDate: string, onlyDate?: boolean): string => {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const base = `${day}.${month}.${year}`;

  return onlyDate ? base : `${base} в ${hours}:${minutes}`;
};
