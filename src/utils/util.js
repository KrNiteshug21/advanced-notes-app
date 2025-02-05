export const formatDate = (date) => {
  return new Date(date)
    .toLocaleString("en-US", {
      month: "short", // "Jan"
      day: "2-digit", // "30"
      year: "numeric", // "2025"
      hour: "2-digit", // "5 PM"
      minute: "2-digit",
      hour12: true, // Use 12-hour format
    })
    .replace(",", " •"); // Replace default comma
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};
