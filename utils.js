
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



export function randomPicker(array) {
  // Generate a random number between 0 and the length of the array.
  const randomIndex = Math.floor(Math.random() * array.length);

  // Return the item at the random index.
  return array[randomIndex];
}
