const formatDate = (date) => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Note: getMonth() returns zero-based month, so we add 1
  const year = dateObject.getFullYear();
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
  return formattedDate;
};

export default formatDate;
