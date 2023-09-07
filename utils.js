export const isToday = (timestamp) => {
  if (!timestamp) return false;
  const currentDate = new Date();
  const dateToCheck = new Date(timestamp);
  if (
    currentDate.getDate() === dateToCheck.getDate() &&
    currentDate.getMonth() === dateToCheck.getMonth() &&
    currentDate.getFullYear() === dateToCheck.getFullYear()
  ) {
    return true;
  }
  return false;
};
