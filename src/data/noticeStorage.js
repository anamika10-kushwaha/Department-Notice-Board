
import { notices as defaultNotices } from "./notices";

export const getStoredNotices = () => {
  const storedNotices = localStorage.getItem("notices");

  if (!storedNotices) {
    localStorage.setItem(
      "notices",
      JSON.stringify(defaultNotices)
    );

    return defaultNotices;
  }

  try {
    return JSON.parse(storedNotices);
  } catch {
    return defaultNotices;
  }
};

export const saveStoredNotices = (notices) => {
  localStorage.setItem("notices", JSON.stringify(notices));
};
