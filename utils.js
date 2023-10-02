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

export function isBefore30Days(timestamp) {
  if (!timestamp) return false;
  const currentDate = new Date();
  const dateToCheck = new Date(timestamp);
  const diffInMillis = Math.abs(currentDate.getTime() - dateToCheck.getTime());
  const diffInDays = diffInMillis / (1000 * 60 * 60 * 24);
  return diffInDays <= 30;
}

export function randomPicker(array) {
  // Generate a random number between 0 and the length of the array.
  const randomIndex = Math.floor(Math.random() * array.length);

  // Return the item at the random index.
  return array[randomIndex];
}

export const jumpToReleventDiv = (id) => {
  const releventDiv = document.getElementById(id);
  // behavior: "smooth" parameter for smooth movement
  releventDiv?.scrollIntoView({ behavior: "smooth", block: "center" });
};
