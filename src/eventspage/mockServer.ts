export const fetchEvents = async () => {
  try {
    const res = await fetch(
      "http://localhost/TK-ced-branch/TK-Website/backend/api/events.php"
    );
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching events:", err);
    return [];
  }
};


export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
};

export const convertTo12HourFormat = (timeString: string): string => {
  const [hour, minute] = timeString.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert to 12-hour format
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
};

export const formatDateRSVP = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    weekday: "long",
  });
};

export const IMAGE_BASE_URL = "http://localhost/TK-ced-branch/TK-Website/";